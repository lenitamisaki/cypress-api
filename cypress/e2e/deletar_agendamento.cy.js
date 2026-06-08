/// <reference types="cypress"/>

const agendamento_payload = require("../fixtures/agendamento_payload.json");
const { ID_INEXISTENTE } = require("../fixtures/constants");

describe('Deletar agendamento', () => {

    it('Deletar agendamento com sucesso', () => {
        cy.authAndCreateBooking(agendamento_payload).then(({ token, bookingId }) => {
            cy.deletar(bookingId, token).then((deleteResult) => {
                expect(deleteResult.status, 'status do delete deve ser 201').to.equal(201)
            })
        })
    });

    it('Deletar agendamento com id inexistente', () => {
        cy.getToken().then((token) => {
            cy.deletar(ID_INEXISTENTE, token).then((result) => {
                expect(result.status, 'status deve ser 405 para id inexistente').to.equal(405)
            })
        })
    });

    it('Deletar agendamento com id já deletado', () => {
        cy.authAndCreateBooking(agendamento_payload).then(({ token, bookingId }) => {
            cy.deletar(bookingId, token).then((firstDelete) => {
                expect(firstDelete.status, 'primeiro delete deve ser 201').to.equal(201)

                cy.deletar(bookingId, token).then((secondDelete) => {
                    expect(secondDelete.status, 'segundo delete deve ser 405').to.equal(405)
                })
            })
        })
    });
});