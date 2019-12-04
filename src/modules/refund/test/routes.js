'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Refund = mongoose.model('Refund');

var credentials,
    token,
    mockup;

describe('Refund CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            amount: '10',
            reason: '',
            refunded_by: '1',
            refunded_payment: false,
            line_items: [{
                id: '1',
                name: 'lo',
                product_id: '1',
                variation_id: '1',
                quantity: '1',
                tax_class: '1',
                subtotal: '1',
                subtotal_tax: '1l',
                total: '1l',
                total_tax: '5',
                taxes: [{
                    id: '1',
                    total: '1',
                    subtotal: '1'
                }],
                sku: '11',
                price: '123'
            }],
            api_refund: true
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Refund get use token', (done) => {
        request(app)
            .get('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Refund get by id', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/refunds/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);

                        assert.equal(resp.data.amount, mockup.amount);
                        assert.equal(resp.data.reason, mockup.reason);
                        assert.equal(resp.data.refunded_by, mockup.refunded_by);
                        assert.equal(resp.data.refunded_payment, mockup.refunded_payment);

                        assert.equal(resp.data.line_items[0].id, mockup.line_items[0].id);
                        assert.equal(resp.data.line_items[0].name, mockup.line_items[0].name);
                        assert.equal(resp.data.line_items[0].product_id, mockup.line_items[0].product_id);
                        assert.equal(resp.data.line_items[0].variation_id, mockup.line_items[0].variation_id);

                        assert.equal(resp.data.line_items[0].quantity, mockup.line_items[0].quantity);
                        assert.equal(resp.data.line_items[0].tax_class, mockup.line_items[0].tax_class);
                        assert.equal(resp.data.line_items[0].subtotal, mockup.line_items[0].subtotal);
                        assert.equal(resp.data.line_items[0].subtotal_tax, mockup.line_items[0].subtotal_tax);
                        assert.equal(resp.data.line_items[0].total, mockup.line_items[0].total);
                        assert.equal(resp.data.line_items[0].total_tax, mockup.line_items[0].total_tax);

                        assert.equal(resp.data.line_items[0].taxes[0].id, mockup.line_items[0].taxes[0].id);
                        assert.equal(resp.data.line_items[0].taxes[0].total, mockup.line_items[0].taxes[0].total);
                        assert.equal(resp.data.line_items[0].taxes[0].subtotal, mockup.line_items[0].taxes[0].subtotal);

                        assert.equal(resp.data.line_items.sku, mockup.line_items.sku);
                        assert.equal(resp.data.line_items.price, mockup.line_items.price);

                        assert.equal(resp.data.api_refund, mockup.api_refund);
                        done();
                    });
            });

    });

    it('should be Refund post use token', (done) => {
        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;

                assert.equal(resp.data.amount, mockup.amount);
                assert.equal(resp.data.reason, mockup.reason);
                assert.equal(resp.data.refunded_by, mockup.refunded_by);
                assert.equal(resp.data.refunded_payment, mockup.refunded_payment);

                assert.equal(resp.data.line_items[0].id, mockup.line_items[0].id);
                assert.equal(resp.data.line_items[0].name, mockup.line_items[0].name);
                assert.equal(resp.data.line_items[0].product_id, mockup.line_items[0].product_id);
                assert.equal(resp.data.line_items[0].variation_id, mockup.line_items[0].variation_id);

                assert.equal(resp.data.line_items[0].quantity, mockup.line_items[0].quantity);
                assert.equal(resp.data.line_items[0].tax_class, mockup.line_items[0].tax_class);
                assert.equal(resp.data.line_items[0].subtotal, mockup.line_items[0].subtotal);
                assert.equal(resp.data.line_items[0].subtotal_tax, mockup.line_items[0].subtotal_tax);
                assert.equal(resp.data.line_items[0].total, mockup.line_items[0].total);
                assert.equal(resp.data.line_items[0].total_tax, mockup.line_items[0].total_tax);

                assert.equal(resp.data.line_items[0].taxes[0].id, mockup.line_items[0].taxes[0].id);
                assert.equal(resp.data.line_items[0].taxes[0].total, mockup.line_items[0].taxes[0].total);
                assert.equal(resp.data.line_items[0].taxes[0].subtotal, mockup.line_items[0].taxes[0].subtotal);

                assert.equal(resp.data.line_items.sku, mockup.line_items.sku);
                assert.equal(resp.data.line_items.price, mockup.line_items.price);

                assert.equal(resp.data.api_refund, mockup.api_refund);
                done();
            });
    });

    it('should be refund put use token', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    amount: '11',
                    reason: '',
                    refunded_by: '2',
                    refunded_payment: true,
                    line_items: [{
                        id: '2',
                        name: 'lol',
                        product_id: '2',
                        variation_id: '2',
                        quantity: '2',
                        tax_class: '2',
                        subtotal: '2',
                        subtotal_tax: '2l',
                        total: '2l',
                        total_tax: '10',
                        taxes: [{
                            id: '2',
                            total: '2',
                            subtotal: '2'
                        }],
                        sku: '22',
                        price: '321'
                    }],
                    api_refund: false
                }
                request(app)
                    .put('/api/refunds/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;

                        assert.equal(resp.data.amount, update.amount);
                        assert.equal(resp.data.reason, update.reason);
                        assert.equal(resp.data.refunded_by, update.refunded_by);
                        assert.equal(resp.data.refunded_payment, update.refunded_payment);

                        assert.equal(resp.data.line_items[0].id, update.line_items[0].id);
                        assert.equal(resp.data.line_items[0].name, update.line_items[0].name);
                        assert.equal(resp.data.line_items[0].product_id, update.line_items[0].product_id);
                        assert.equal(resp.data.line_items[0].variation_id, update.line_items[0].variation_id);

                        assert.equal(resp.data.line_items[0].quantity, update.line_items[0].quantity);
                        assert.equal(resp.data.line_items[0].tax_class, update.line_items[0].tax_class);
                        assert.equal(resp.data.line_items[0].subtotal, update.line_items[0].subtotal);
                        assert.equal(resp.data.line_items[0].subtotal_tax, update.line_items[0].subtotal_tax);
                        assert.equal(resp.data.line_items[0].total, update.line_items[0].total);
                        assert.equal(resp.data.line_items[0].total_tax, update.line_items[0].total_tax);

                        assert.equal(resp.data.line_items[0].taxes[0].id, update.line_items[0].taxes[0].id);
                        assert.equal(resp.data.line_items[0].taxes[0].total, update.line_items[0].taxes[0].total);
                        assert.equal(resp.data.line_items[0].taxes[0].subtotal, update.line_items[0].taxes[0].subtotal);

                        assert.equal(resp.data.line_items.sku, update.line_items.sku);
                        assert.equal(resp.data.line_items.price, update.line_items.price);

                        assert.equal(resp.data.api_refund, update.api_refund);
                        done();
                    });
            });

    });

    it('should be refund delete use token', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/refunds/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be refund get not use token', (done) => {
        request(app)
            .get('/api/refunds')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be refund post not use token', function (done) {

        request(app)
            .post('/api/refunds')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be refund put not use token', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/refunds/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be refund delete not use token', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/refunds/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Refund.remove().exec(done);
    });

});