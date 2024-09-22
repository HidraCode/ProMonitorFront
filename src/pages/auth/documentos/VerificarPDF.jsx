import React, { useState, useEffect } from "react";
import { Col, Row, Button, } from 'antd';
import logoPreta from '../../../assets/logoPreta.svg';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { getFrequencia, getRelatorio } from "../../../services/documentoService.js";
import { baixarFrequencia, baixarRelatorio } from "../../../services/documentoService.js";

const VerificarPDF = () => {
    const { tipo_documento, document_id } = useParams(); // Recupera o parâmetro da URL    
    const [verificado, setVerificado] = useState(false)

    const handleDownload = async () => {
        try {

        if (tipo_documento === 'frequencia'){
            const response = await baixarFrequencia(document_id);
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = `frequencia_assinada_${document_id}.pdf`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } else {
            const response = await baixarRelatorio(document_id);
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = `relatorio_assinado${document_id}.pdf`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }

        } catch (error) {
            message.error('Erro ao baixar arquivo: ', error);
        }
    };

    useEffect(() => {
        const search = async () => {
            try {
                let response;
                if (tipo_documento === 'frequencia') {
                    response = await getFrequencia(document_id);
                } else {
                    response = await getRelatorio(document_id);
                }
                
                if (response && response.data) {
                    setVerificado(true);
                } else {
                    setVerificado(false);
                }
            } catch (error) {
                console.log(error);
                setVerificado(false);
            }
        }
        search();
    }, [tipo_documento, document_id]);
    

    return (
        <section className="relative h-screen">
            <Row
                justify="center"
                align="middle"
                className="h-full"
            >
                <Col xs={16} sm={16} md={16} lg={12} xl={6}
                    justify="center"
                    className="text-center space-y-6" >
                    {/* Logo do ProMonitor */}
                    <img src={logoPreta}
                        alt="Logo ProMonitor"
                        className="mx-auto size-5/12" />
                    <h1 className="mt-0 md:text-4xl text-2xl font-bold text-[#2d4872]">Verificador de autenticidade</h1>
                    {verificado ? (
                        <>
                            <p className="font-medium lg:text-sm sm:text-xs w-2/3 mx-auto">Um documento com o ID correspondente foi encontrado no nosso banco de dados. Para verificar a autenticidade, faça download do arquivo e analise os campos.</p>
                            <Button type='default' onClick={handleDownload} className="w-2/3">Baixar PDF</Button>
                        </>
                    ) : (
                        <p className="font-medium lg:text-sm sm:text-xs w-2/3 mx-auto">
                            Nenhum documento com o ID correspondente foi encontrado no nosso banco de dados.
                        </p>
                    )}
                </Col>
            </Row>
        </section>
    );
};

export default VerificarPDF;
