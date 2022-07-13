import path from 'path';
import { engine } from 'express-handlebars';
import express, { NextFunction, Request, Response } from 'express';

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
    res.render('home', {
        title: 'Accueil',
    });
});

app.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        title: 'About'
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Erreur, voir terminal!');
});

app.get('*', (req: Request, res: Response) => {
    res.render('404', {
        title: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});