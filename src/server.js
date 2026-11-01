import express from 'express';
import {connectDB} from "./common/db/connection.js";
import {userRouter}  from"./app/user/user.route.js";
import {noteRouter} from "./app/note/note.route.js";

 export const app =express();

app.use(express.json());

app.use('/users',userRouter);
app.use('/notes',noteRouter)

connectDB
    .then(() => {
        app.listen(3000, () => {
            console.log("server running on port 3000");
        });
    })
    .catch((error) => {
        console.log(error);
    });