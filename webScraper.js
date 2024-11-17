const axios = require('axios');
const cheerio = require('cheerio');

// Função para adicionar delay entre as requisições

(async () => {
    const baseUrl = 'https://www.imaginie.com.br/temas-de-redacao/';
    let currentPage = 1;
    const temas = [];

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
                temasPagina.push($(element).text().trim()); // Extrai o texto
            });

            // Se não encontrar novos temas, encerra o loop
            if (temasPagina.length === 0) {
                console.log('Não há mais páginas para processar.');
                break;
            }

            // Adiciona os temas da página atual à lista geral
            temas.push(...temasPagina);
            console.log(`Página ${currentPage} processada: ${temasPagina.length} temas encontrados.`);
            
            // Avança para a próxima página
            currentPage++;

            
        } catch (error) {
            console.error(`Erro ao acessar a página ${currentPage}:`, error.message);
            break;
        }
    }

    // Exibe todos os temas coletados
    console.log('Temas de Redação coletados:');
    console.log(temas);
})();
