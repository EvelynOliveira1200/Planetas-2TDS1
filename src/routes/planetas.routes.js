import { Router } from "express"

const planetasRoutes = Router()


let planetas = [
    {
        id: Number(Math.floor(Math.random() * 999999) + 1),
        nome: "Planeta Dev",
        temperatura: 13.03,
        agua: false, //indicação de existência de água
        atm: ["JS", "NODE", "VS", "Code"]
    },
]


    // Rota para buscar todos os elementos do array planetas
    planetasRoutes.get("/", (req, res) => {
        return res.status(200).send(planetas)
    })

// Rota para criar nova planetas
planetasRoutes.post("/", (req, res) => {
        const { titulo, genero, emCartaz } = req.body

        const novoplaneta = {
            id: Number(Math.floor(Math.random() * 99) + 1),
            titulo,
            genero,
            emCartaz,
        }

        planetas.push(novoplaneta)
        return res.status(201).send(planetas)
    })

planetasRoutes.get("/:id", (req, res) => {
        const { id } = req.params

        console.log(id);


        const planeta = planetas.find((movie) => movie.id === Number(id)
        )

        //console.log(planetas)

        if (!planeta) {
            return res.status(404).send({ message: "planetas não encontrada!" })
        }

        return res.status(200).send(planetas)
    })

// Rota para editar uma planetas 
planetasRoutes.put("/:id", (req, res) => {
        const { id } = req.params

        const planetas = planetas.find((movie) => movie.id === Number(id))

        //console.log(planetas)

        if (!planeta) {
            return res.status(404).send({ message: "planeta não encontrado!" })
        }

        const { titulo, genero, emCartaz } = req.body

        console.log(titulo)


        planeta.titulo = titulo
        planeta.genero = genero
        planeta.emCartaz = emCartaz

        return res.status(200).send({
            message: "planeta atualizado",
            planeta,
        })

    })


// Rota para deletar um planeta
planetasRoutes.delete("/:id", (req, res) => {
        const { id } = req.params

        const planeta = planetas.find((movie) => movie.id === Number(id))

        if (!planeta) {
            return res.status(404).send({ message: "planeta não encontrado!" })
        }

        planetas = planetas.filter((movie) => movie.id !== Number(id))

        return res.status(200).send({
            message: "planeta deletado!",
            planeta
        })

    })


export default planetasRoutes