import express, {Application, Request, Response} from "express" ; 

 

const PORT = process.env.PORT || 400; 

 

const app: Application = express(); 

 

app.get("/ping", async (_req : Request, res: Response) => { res.json({ 

    message: "I still don't have access to moodle ;( and this is the other run one"

    }); 

}); 

 app.get('/bananas', async (_req : Request, res: Response) => { 

    res.json({ 

    message: "this is bananas"
    }); 

}); 

 app.get('/games', async (_req : Request, res: Response) => { 

    res.json({ 

    message: "so manyyyy gammmmessssss"
    ,game1: "this is game 1"
    ,game2: "this is game 2"
    ,game3: "this is game 3"

    }); 

}); 

 app.get('/gameBetter', async (_req : Request, res: Response) => { 

    res.json({ 

    message: "so manyyyy gammmmessssss"
    ,game1: "this is game 1"
    ,game2: "this is game 2"
    ,game3: "this is game 3"
    ,game4: { innergame: "this is inner game 4", innergame2: "this is inner game 4.2" }

    }); 

}); 

app.listen(PORT, () => { 

    console.log("Server is running on port", PORT); 

    }); 