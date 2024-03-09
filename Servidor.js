const express = require('express');
const path = require('path');
const app = express();

// Configuração de outras rotas e middleware...
app.use(express.static(path.join(__dirname, 'build')));
// Redirecionar todas as outras solicitações para o index.html
app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
 });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
