/// <reference types="cypress"/>

describe('Cadastrar agendamento', () => {

    it('Cadastrar agendamento com sucesso', () => {
        cy.createBooking().then((response) => {
            expect(response.status, 'status do cadastro deve ser 200').to.equal(200)
            expect(response.body, 'body deve conter bookingid').to.have.property('bookingid')
            expect(response.body, 'body deve conter booking').to.have.property('booking')
            cy.defaultBookingPayload().then((payload) => {
                expect(response.body.booking.firstname, 'firstname deve corresponder ao payload').to.equal(payload.firstname)
                expect(response.body.booking.lastname, 'lastname deve corresponder ao payload').to.equal(payload.lastname)
                expect(response.body.booking.totalprice, 'totalprice deve corresponder ao payload').to.equal(payload.totalprice)
                expect(response.body.booking.depositpaid, 'depositpaid deve corresponder ao payload').to.equal(payload.depositpaid)
                expect(response.body.booking.bookingdates.checkin, 'checkin deve corresponder ao payload').to.equal(payload.bookingdates.checkin)
                expect(response.body.booking.bookingdates.checkout, 'checkout deve corresponder ao payload').to.equal(payload.bookingdates.checkout)
                expect(response.body.booking.additionalneeds, 'additionalneeds deve corresponder ao payload').to.equal(payload.additionalneeds)
            })
        })
    });

    it('Cadastrar agendamento com dados dinâmicos usando faker', () => {
        cy.cadastrarFaker().then(({ result, payload }) => {
            expect(result.status, 'status do cadastro deve ser 200').to.equal(200)
            expect(result.body, 'body deve conter bookingid').to.have.property('bookingid')
            expect(result.body.booking.firstname, 'firstname deve corresponder ao payload faker').to.equal(payload.firstname)
            expect(result.body.booking.lastname, 'lastname deve corresponder ao payload faker').to.equal(payload.lastname)
            expect(result.body.booking.totalprice, 'totalprice deve corresponder ao payload faker').to.equal(payload.totalprice)
            expect(result.body.booking.depositpaid, 'depositpaid deve corresponder ao payload faker').to.equal(payload.depositpaid)
            expect(result.body.booking.bookingdates.checkin, 'checkin deve corresponder ao payload faker').to.equal(payload.bookingdates.checkin)
            expect(result.body.booking.bookingdates.checkout, 'checkout deve corresponder ao payload faker').to.equal(payload.bookingdates.checkout)
        })
    });
});