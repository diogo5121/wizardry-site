import React from 'react';
import {
    Box,
    Text,
    Heading,
    Stack,
    VStack,
    Button,
    Center,
    Image,
} from '@chakra-ui/react';
import HeaderGlobal from '../styles/headerGlobal';
import Footer from '../styles/footer';
import ipApi from '../../Services/ipApi';

const Comofunciona = () => {
    return (
        <>
            <HeaderGlobal />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                bg="#edf3f8"
                m={2}
                shadow="lg"
                borderRadius={20}
            >
                <Box
                    display="flex"
                    flexDirection={{ base: 'column', md: 'row' }}
                    justifyContent="space-between"
                    borderRadius={20}
                >
                    <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                        m={1}
                        marginLeft={{ base: 0, md: 20 }}
                    >
                        <Image src={`${ipApi}/images/logo.jpg`} alt="Wizardry Logo" boxSize="50px" />
                        <Text fontWeight={700} fontSize={30} marginLeft={10}>
                            Como funciona
                        </Text>
                    </Box>
                </Box>
            </Box>

            {/* Seção do Comprador */}
            <Box
                bg="#edf3f8"
                m={5}
                p={5}
                borderRadius={20}
                boxShadow="lg"
                textAlign="center"
            >
                <Heading as="h2" size="xl" mb={5}>
                    Para Compradores
                </Heading>
                <Stack spacing={5}>
                    <Text>
                        1. Faça o login no Wizardry.
                    </Text>
                    <Text>
                        2. Escolha o produto que deseja comprar.
                    </Text>
                    <Text>
                        3. Efetue a compra com total segurança.
                    </Text>
                    <Text>
                        4. Receba o produto garantido.
                    </Text>
                </Stack>
            </Box>

            {/* Seção do Vendedor */}
            <Box
                bg="#edf3f8"
                m={5}
                p={5}
                borderRadius={20}
                boxShadow="lg"
                textAlign="center"
            >
                <Heading as="h2" size="xl" mb={5}>
                    Para Vendedores
                </Heading>
                <Stack spacing={5}>
                    <Text>
                        1. Cadastre o anúncio do seu produto.
                    </Text>
                    <Text>
                        2. Tenha total segurança na transação.
                    </Text>
                    <Text>
                        3. Aguarde a confirmação do comprador.
                    </Text>
                    <Text>
                        4. Receba o pagamento de forma segura.
                    </Text>
                </Stack>
            </Box>

            {/* Seção de Informações Adicionais */}
            <Box
                bg="#edf3f8"
                m={5}
                p={5}
                borderRadius={20}
                boxShadow="lg"
                textAlign="center"
            >
                <Heading as="h2" size="xl" mb={5}>
                    Estamos aqui por você
                </Heading>
                <Text>
                    Bem-vindo à Wizardry, a plataforma líder para compra e venda de produtos digitais online. Aqui na Wizardry, estamos empenhados em oferecer a você a experiência mais segura e eficiente ao realizar transações no vasto mercado digital.

                    Ao escolher a Wizardry, você opta por uma plataforma que vai além das expectativas, proporcionando não apenas segurança inigualável, mas também suporte excepcional durante todo o processo. Queremos que nossos usuários se sintam confiantes ao comprar e vender, sabendo que estão apoiados por uma equipe dedicada.

                    Nossa missão é simplificar suas transações online, oferecendo uma interface intuitiva e recursos avançados. Garantimos que cada compra seja protegida e cada venda seja conduzida com total segurança. A Wizardry é mais do que uma plataforma; é um ecossistema onde compradores e vendedores se encontram para realizar negócios de forma transparente e eficaz.

                    Conte conosco para criar uma comunidade onde a confiança é fundamental. Estamos comprometidos em fornecer a melhor experiência possível para que você possa desfrutar plenamente do comércio digital. Junte-se a nós na Wizardry e descubra um novo nível de facilidade e confiabilidade nas suas transações online.
                </Text>

            </Box>

            <Footer />
        </>
    );
};

export default Comofunciona;
