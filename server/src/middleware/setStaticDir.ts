import express from "express";

export const setStaticDir = (app: express.Application) => {
    app.use(express.static(`./src/public`));
}