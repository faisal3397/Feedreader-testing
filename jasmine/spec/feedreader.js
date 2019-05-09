/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() { // A test suite to make sure that the allFeeds variable has been defined and that it is not empty.
       
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('URL defined', function() {
            allFeeds.forEach(element => { //loop through each element of 'allFeeds'
                expect(element.url).toBeDefined(); //checks that the url is defined
                expect(element.url.length).not.toBe(0); //check that the url is not empty
            });
        })


        it('name defined', function() {
            allFeeds.forEach(element => { //loop through each element of 'allFeeds', checks that the name is defined and that it is not empty
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        })
    });


    describe('The menu', function(){

        // a test that ensures the menu element is hidden by default.
        it('menu is hidden', function(){
            let body = document.getElementsByTagName('body')[0];
            //we use body[0] because 'body' is an HTML collection so we need the first element of the collection to get the class name
            expect(body.className).toBe('menu-hidden')
        })

         /*  a test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
         it('menu is hidden/displayed', function(){
             let menuIcon = document.getElementsByClassName('menu-icon-link')[0];
             let body = document.getElementsByTagName('body')[0];
             menuIcon.click()
             expect(body.className).toBe('') //Check that the menu is displayed after the first click
             menuIcon.click()
             expect(body.className).toBe('menu-hidden') //Check that the menu is hidden after the second click
         })

    })


    describe('Initial Entries', function(){

        /*a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        
        beforeEach(function(done){
            setTimeout(function(){
                loadFeed(1)
                done()
            }, 1000)
             
        })

        it('at least single entry', function(done){
           
           let container = document.querySelector('.feed')
           let entriesLength = container.children.length //the length tells us how many entries are in the container
           
           expect(entriesLength).toBeGreaterThan(0)
           done()
          
        })


    })

    describe('New Feed Selection', function(){
        /*  a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let title 
        beforeEach(function(done){
            setTimeout(function(){
                loadFeed(1)
                title = document.querySelector('.header-title').innerText // get the header title
                done()
            }, 2000)
             
        })

        it('content ia changed', function(done){
            let title2 
            setTimeout(function(){
                title2 = document.querySelector('.header-title').innerText
            }, 3000) /* it needs to run later
                        so that we can have time to save
                        the title of the first content then save the title
                        of the second content and compare them with each other
                     */
            expect(title).not.toBe(title2) // if the titles are different that means that the content is changed
            done()
         })
    })

}());
