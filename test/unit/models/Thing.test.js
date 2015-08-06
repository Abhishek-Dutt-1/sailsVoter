describe.only('ThingModel', function() {
    describe('#find()', function() {
        it('should check find function', function(done) {
            Thing.find()
                .then(function(results) {
                    // some tests
                    done();
                })
                .catch(done);
        });
    });
});
