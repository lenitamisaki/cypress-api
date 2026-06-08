/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
const defaultBookingPayload = require("../fixtures/agendamento_payload.json");

Cypress.Commands.add("login", (user, password) => {
    return cy.request({
        method: "POST",
        url: "/auth",
        body: {
            username: user,
            password: password
        }
    }).then((result) => {
        return result.body.token
    });
});

Cypress.Commands.add("getToken", (user = Cypress.env("username"), password = Cypress.env("password")) => {
    return cy.login(user, password);
});

Cypress.Commands.add("defaultBookingPayload", (overrides = {}) => {
    const bookingdates = {
        ...defaultBookingPayload.bookingdates,
        ...(overrides.bookingdates || {})
    };

    const payload = {
        ...defaultBookingPayload,
        ...overrides,
        bookingdates
    };

    return cy.wrap(payload);
});

Cypress.Commands.add("cadastrar", (payload) => {
    return cy.request({
        method: "POST",
        url: "/booking",
        body: payload,
    });
});

Cypress.Commands.add("createBooking", (overrides = {}) => {
    return cy.defaultBookingPayload(overrides).then((payload) => cy.cadastrar(payload));
});

Cypress.Commands.add("cadastrarFaker", () => {
    const checkin = faker.date.future();
    const checkout = new Date(checkin);
    checkout.setDate(checkout.getDate() + 3);

    const payload = {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: false,
        bookingdates: {
            checkin: checkin.toISOString().split('T')[0],
            checkout: checkout.toISOString().split('T')[0],
        },
        additionalneeds: faker.lorem.sentence(3)
    }

    return cy.request({
        method: "POST",
        url: "/booking",
        body: payload,
    }).then((result) => {
        return cy.wrap({ result, payload })
    });
});

Cypress.Commands.add("authenticatedRequest", (method, url, token, body = undefined) => {
    return cy.request({
        method,
        url,
        headers: {
            'Cookie': `token=${token}`
        },
        body,
        failOnStatusCode: false
    });
});

Cypress.Commands.add("authAndCreateBooking", (overrides = {}, user = Cypress.env("username"), password = Cypress.env("password")) => {
    return cy.login(user, password).then((token) => {
        return cy.createBooking(overrides).then((response) => {
            return cy.wrap({
                token,
                bookingId: response.body.bookingid,
                booking: response.body
            })
        })
    })
});

Cypress.Commands.add("deletar", (bookingId, token) => {
    return cy.authenticatedRequest("DELETE", `/booking/${bookingId}`, token);
});

Cypress.Commands.add("update", (bookingId, token, updatePayload) => {
    return cy.authenticatedRequest("PUT", `/booking/${bookingId}`, token, updatePayload);
});

Cypress.Commands.add("patch", (bookingId, token, patchPayload) => {
    return cy.authenticatedRequest("PATCH", `/booking/${bookingId}`, token, patchPayload);
});

Cypress.Commands.add("buscar", (bookingId) => {
    return cy.request({
        method: "GET",
        url: `/booking/${bookingId}`,
        failOnStatusCode: false
    });
});