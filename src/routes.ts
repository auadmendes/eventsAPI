import express from 'express';
import puppeteer from 'puppeteer';

const routes = express.Router();

routes.get('/events', async (req, res) => {

    console.log('passando...')


    const ingressoDigital = 'https://www.ingressodigital.com/list.php?busca=S&txt_busca=Vit%C3%B3ria&txt_busca_m='
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();

    await page.goto(ingressoDigital);

    const textContents = await page.$$eval('.col-6', divs => {
        return divs.map(div => div.textContent?.trim());
    });

    console.log('Text inside divs with class col-6:', textContents);

    await browser.close();

    return res.json({ textContents });



});

export default routes;