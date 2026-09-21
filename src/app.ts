import express, {Application, Request, Response} from "express" ; 
import carRoutes from './routes/cars';

const PORT = process.env.PORT || 400; 

 

const app: Application = express(); 


app.use('/api/v1/cars', carRoutes); 

app.use(express.json()); 

app.use((req, _res, next) => {   

    console.log(`${req.method} ${req.originalUrl}`); 

    next(); 

}); 

 

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

    app.use((req, _res, next) => {   

    console.log(`${req.method} ${req.originalUrl}`); 

    next(); 

}); 

