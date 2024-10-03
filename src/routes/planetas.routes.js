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

// Rota para cadastrar um novo planetas
planetasRoutes.post("/", (req, res) => {
        const { nome, temperatura, agua, atm} = req.body

        if(!nome || !temperatura || !agua) {
            return res.status(400).send({message: "Os campos nome, temperatura e água são obrigatórios!"})
        }

        //Validação para existência de água
        if(agua != "sim" && agua != "não") {
            return res.status(400).send({message: "Digite 'sim' ou 'não'!"})
        }

        const novoPlaneta = {
            id: Number(Math.floor(Math.random() * 999999) + 1),
            nome,
            temperatura,
            agua,
            atm,
        }

        planetas.push(novoPlaneta)
        return res.status(201).send({message:"Planeta cadastrado com sucesso"})
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