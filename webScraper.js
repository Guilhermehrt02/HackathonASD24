const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
    const baseUrl = 'https://www.imaginie.com.br/temas-de-redacao/';
    let currentPage = 1;

    while (true) {
        try {
            console.log(`Buscando temas na página ${currentPage}...`);

            // Faz a requisição HTTP para a página atual
            const { data } = await axios.get(`${baseUrl}${currentPage === 1 ? '' : currentPage + '/'}`);

            // Carrega o HTML no Cheerio
            const $ = cheerio.load(data);

            // Captura os temas da página atual
            const temasPagina = [];
            $('.elementor-heading-title.elementor-size-medium').each((index, element) => {
                const title = $(element).text().trim(); // Extrai o texto do tema
                if (title) {
                    temasPagina.push({ title, exam: 'ENEM' }); // Adiciona o título e define o exame como "ENEM"
                }
            });

            // Se não encontrar novos temas, encerra o loop
            if (temasPagina.length === 0) {
                console.log('Não há mais páginas para processar.');
                break;
            }

            // Salva cada tema via API
            for (const tema of temasPagina) {
                await saveTheme(tema); // Chama a função de salvar para cada tema
            }

            console.log(`Página ${currentPage} processada: ${temasPagina.length} temas enviados.`);

            // Avança para a próxima página
            currentPage++;
        } catch (error) {
            console.error(`Erro ao acessar a página ${currentPage}:`, error.message);
            break;
        }
    }
})();

async function saveTheme(tema) {
    const apiUrl = 'http://localhost:3000/potential-themes'; // Substitua pelo endpoint correto

    try {
        const response = await axios.post(apiUrl, tema); // Faz o POST com os dados do tema
        console.log(`Tema "${tema.title}" enviado com sucesso:`, response.data);
    } catch (error) {
        console.error(`Erro ao enviar tema "${tema.title}":`, error.response?.data || error.message);
    }
}
