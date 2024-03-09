const validarEmail = (email) => {
    return email?.toString().includes('@') && email?.toString().includes('.')
}

const validarSenha = (senha) => {
    return senha?.toString().length > 6
}

const validarNome = (nome) => {
    return nome?.toString().length > 2
}

const validarTelefone = (telefone) => {
    return telefone?.toString().length >= 8
}

const validarConfirmarSenha = (senha, confirmarSenha) => {
    return validarSenha(senha) && senha === confirmarSenha
}
const validarTitulo = (titulo) => {
    return titulo?.toString().length <= 40
}
const validarDescricao = (descricao) => {
    return descricao?.toString().length <= 900
}
const sanitizeInput = (inputValue) => {
    // Substitua ' ou '' ou {} ou () por espaços vazios
    return inputValue.replace(/['"{}()]/g, ' ');
  };

export {
    validarEmail,
    validarSenha,
    validarNome,
    validarTelefone,
    validarConfirmarSenha,
    validarTitulo,
    validarDescricao,
    sanitizeInput,
}