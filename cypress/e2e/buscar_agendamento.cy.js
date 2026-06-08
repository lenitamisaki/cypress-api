/// <reference types="cypress"/>

const agendamento_payload = require("../fixtures/agendamento_payload.json");
const { ID_INVALIDO } = require("../fixtures/constants");

describe('Buscar agendamento', () => {

    it('Buscar agendamento com sucesso', () => {
        cy.cadastrar(agendamento_payload).then((postResult) => {
            expect(postResult.status, 'status do cadastro deve ser 200').to.equal(200)

            cy.buscar(postResult.body.bookingid).then((getResult) => {
                expect(getResult.status, 'status da busca deve ser 200').to.equal(200)
                expect(getResult.body.firstname, 'firstname deve corresponder ao payload').to.equal(agendamento_payload.firstname)
                expect(getResult.body.lastname, 'lastname deve corresponder ao payload').to.equal(agendamento_payload.lastname)
                expect(getResult.body.bookingdates.checkin, 'checkin deve corresponder ao payload').to.equal(agendamento_payload.bookingdates.checkin)
            })
        })
    });

    it('Buscar agendamento inexistente', () => {
        cy.buscar(ID_INVALIDO).then((result) => {
            expect(result.status, 'status deve ser 404 para id inválido').to.equal(404)
        })
    });
});