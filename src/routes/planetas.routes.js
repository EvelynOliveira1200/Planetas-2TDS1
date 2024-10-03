import { Router } from "express"

const filmesRoutes = Router()


let filmesMarcantes = [
    {
        id: Number(Math.floor(Math.random() * 99) +1),
        titulo: "Bad Boys",
        genero: "Ação",
        emCartaz: false,
    },
    {
        id: Number(Math.floor(Math.random() * 99) +1),
        titulo: "Deadpool & Wolverine",
        genero: "Ação",
        emCartaz: true,
    },
    {
        id: Number(Math.floor(Math.random() * 99) +1),
        titulo: "É assim que acaba",
        genero: "Romance",
        emCartaz: true,
    }
]

// Rota para buscar todos os elementos do array filmesMarcantes
filmesRoutes.get("/", (req, res) => {
    return res.status(200).send(filmesMarcantes)
})

// Rota para criar nova filmes
filmesRoutes.post("/", (req, res) => {
    const { titulo, genero, emCartaz} = req.body

    const novoFilme = {
        id: Number(Math.floor(Math.random() * 99) +1),
        titulo,
        genero,
        emCartaz,
    }

    filmesMarcantes.push(novoFilme)
    return res.status(201).send(filmesMarcantes)
})

filmesRoutes.get("/:id", (req, res) => {
    const { id } = req.params

    console.log(id);


    const filme = filmesMarcantes.find((movie) => movie.id === Number(id)
    )

    //console.log(filmes)

    if (!filme) {
        return res.status(404).send({ message: "filmes não encontrada!" })
    }

    return res.status(200).send(filmesMarcantes)
})

// Rota para editar uma filmes 
filmesRoutes.put("/:id", (req, res) => {
    const { id } = req.params

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id))

    //console.log(filmes)

    if (!filme) {
        return res.status(404).send({ message: "filme não encontrado!" })
    }

    const { titulo, genero, emCartaz} = req.body

    console.log(titulo)


    filme.titulo = titulo
    filme.genero = genero
    filme.emCartaz = emCartaz

    return res.status(200).send({
        message: "filme atualizado",
        filme,
    })

})


// Rota para deletar um filme
filmesRoutes.delete("/:id", (req, res) => {
    const { id } = req.params

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id))

    if (!filme) {
        return res.status(404).send({ message: "Filme não encontrado!" })
    }

    filmesMarcantes = filmesMarcantes.filter((movie) => movie.id !== Number(id))

    return res.status(200).send({
        message: "Filme deletado!", 
        filme
    })

})


export default filmesRoutes