import { useEffect } from "react";

const PuxarAvaliacoes = (id, todasasavaliacoes) => {

    const Avaliacoesfiltradas = todasasavaliacoes.filter(avaliacao => parseFloat(avaliacao.idanuncio) === id)

    if (Avaliacoesfiltradas.length === 0) {
        return (<>Avaliações: 0 (0.0)⭐</>)
    } else {
        const numeroDeAvaliacoes = Avaliacoesfiltradas.length;
        const soma = Avaliacoesfiltradas.reduce((total, Avaliacao) => total + parseFloat(Avaliacao.valor), 0);
        const media = soma / numeroDeAvaliacoes;

        return (
            <>Avaliações: {numeroDeAvaliacoes} ({media.toFixed(1)})⭐</>
        );
    }
};

export default PuxarAvaliacoes;
