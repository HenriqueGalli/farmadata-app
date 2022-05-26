import "./Sobre.css";

function Sobre() {

    return (
        <div className="sobre">
            <div className="divNomes">
                <h4 className="Nomes">Henrique Galli - RA:081190044</h4>
                <h4 className="Nomes">Márcio Rios - RA:081200041</h4>
                <h4 className="Nomes">Renan Oliveira - RA:081190025</h4>
                <h4 className="Nomes NomeUltimo">William Saito - RA:081190001</h4>
                <p>A ideia por trás desta aplicação Web é ser um sistema de gerenciamento de Medicamentos para as farmácias, com funcionalidades de cadastro, edição e listagem dos medicamentos presentes naquela unidade da farmácia, o ponto mais interessante e útil do sistema é a possibilidade do gerenciamento de estoque e valores dos remédios.</p>
            </div>
        </div>
    );

}

export default Sobre;