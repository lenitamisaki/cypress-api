/// <reference types="cypress"/>

const agendamento_payload = require("../fixtures/agendamento_payload.json");
const agendamento_payload_update = require("../fixtures/agendamento_payload_update.json");
const agendamento_payload_parcial_update = require("../fixtures/agendamento_payload_parcial_update.json");
const { ID_INEXISTENTE } = require("../fixtures/constants");

describe('Update completo com sucesso', () => {

    it('Update completo com sucesso', () => {
        cy.authAndCreateBooking(agendamento_payload).then(({ token, bookingId }) => {
            cy.update(bookingId, token, agendamento_payload_update).then((updateResult) => {
                expect(updateResult.status, 'status do update deve ser 200').to.equal(200)
                expect(updateResult.body.firstname, 'firstname deve corresponder ao payload de update').to.equal(agendamento_payload_update.firstname)
                expect(updateResult.body.lastname, 'lastname deve corresponder ao payload de update').to.equal(agendamento_payload_update.lastname)
                expect(updateResult.body.depositpaid, 'depositpaid deve corresponder ao payload de update').to.equal(agendamento_payload_update.depositpaid)
            })
        })
    });

    it('Update parcial com sucesso - primeiro nome', () => {
        cy.authAndCreateBooking(agendamento_payload).then(({ token, bookingId }) => {
            cy.patch(bookingId, token, agendamento_payload_parcial_update).then((patchResult) => {
                expect(patchResult.status, 'status do patch deve ser 200').to.equal(200)
                expect(patchResult.body.firstname, 'firstname deve ser o valor atualizado').to.equal(agendamento_payload_parcial_update.firstname)
                expect(patchResult.body.lastname, 'lastname deve permanecer o original').to.equal(agendamento_payload.lastname)
            })
        })
    });

    it('Update com id inválido', () => {
        cy.getToken().then((token) => {
            cy.update(ID_INEXISTENTE, token, agendamento_payload_update).then((updateResult) => {
                expect(updateResult.status, 'status deve ser 405 para id inexistente').to.equal(405)
            })
        })
    });

    it('Update sem autenticação', () => {
        cy.createBooking().then((postResult) => {
            expect(postResult.status, 'status do cadastro deve ser 200').to.equal(200)

            cy.update(postResult.body.bookingid, '', agendamento_payload_update).then((updateResult) => {
                expect(updateResult.status, 'status deve ser 403 sem token').to.equal(403)
            })
        })
    });
});