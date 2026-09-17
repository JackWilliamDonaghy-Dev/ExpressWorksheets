import express, {Application, Request, Response} from "express" ; 

 

const PORT = process.env.PORT || 400; 

 

const app: Application = express(); 

 

app.get("/ping", async (_req : Request, res: Response) => { res.json({ 

    message: "I still don't have access to moodle ;( and this is the other run one"

    }); 

}); 

 

app.listen(PORT, () => { 

    console.log("Server is running on port", PORT); 

    }); 