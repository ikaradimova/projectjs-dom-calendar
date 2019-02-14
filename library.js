let $ = (function () {

    'use strict';

    /**
     * Constructor that gets the selector
     * @param selector
     * @constructor
     */
    let Constructor = function (selector) {
        if (selector === 'document') {
            this.elems = [document];
        } else if (selector === 'window') {
            this.elems = [window];
        } else {
            this.elems = Array.from(document.querySelectorAll(selector));
        }
    };

    /**
     * Instantiating the constructor
     * @param selector
     * @returns {Constructor}
     */
    let instantiate = function (selector) {
        return new Constructor(selector);
    };

    /**
     * Function for looping the elements
     * @param callback
     * @returns
     */
    Constructor.prototype.each = function (callback) {
        if (!callback || typeof callback !== 'function') {
            return;
        }
        for (let i = 0; i < this.elems.length; i++) {
            callback(this.elems[i], i);
        }
        return this;
    };

    /**
     * Add a class to elements
     * @param {String} className The class name
     */
    Constructor.prototype.addClass = function (className) {
        this.each(function (item) {
            item.classList.add(className);
        });
        return this;
    };

    /**
     * Delete a class to elements
     * @param {String} className The class name
     */
    Constructor.prototype.deleteClass = function (className) {
        this.each(function (item) {
            item.classList.remove(className);
        });
        return this;
    };

    Constructor.prototype.toggleClass = function (className) {
        this.each(function (item) {
            if (item.classList.contains(className)) {
                item.classList.remove(className);
            } else {
                item.classList.add(className);
            }
        })
    };


    /**
     * Function for adding new element to some other element
     * @param selector
     * @param text
     * @returns {Constructor}
     */
    Constructor.prototype.addElement = function (selector, text = '') {
        this.each(function (item) {
            let newElement = document.createElement(selector);
            if (text !== null || text !== '') {
                let elementText = document.createTextNode(text);
                newElement.appendChild(elementText);
            }
            item.appendChild(newElement);
        });
        return this;
    };

    /**
     * Function for deleting an element
     * @returns {Constructor}
     */
    Constructor.prototype.deleteElement = function () {
        this.each(function (item) {
            item.remove();
            // item.parentNode.removeChild(item);
        });
        return this;
    };

    /**
     * Function for setting an attribute
     * @param attr (id/class/data/style/innerHtml/innerText)
     * @param value
     * @returns {Constructor}
     */
    Constructor.prototype.setAttribute = function (attr, value) {
        if (value === null || value === undefined) {
            console.error('Value is required in setAttribute(attr, value).');
        } else {
            this.each(function (item) {
                switch (attr) {
                    case 'id':
                        item.id = value;
                        break;
                    case 'class':
                        item.className = value;
                        break;
                    case 'data':
                        item.data = value;
                        break;
                    case 'value':
                        item.attribute = value;
                        break;
                    case 'style':
                        item.style = value;
                        break;
                    case 'innerText':
                    case 'inner-text':
                        item.innerText = value;
                        break;
                    case 'innerHtml':
                    case 'inner-html':
                        item.innerHTML = value;
                }
            });

            return this;
        }
    };


    Constructor.prototype.getAttribute = function (attr) {
        let attribute;
        this.each(function (item) {
            switch (attr) {
                case 'id':
                    // console.log(item);
                    // console.log(item.id);
                    attribute = item.id;
                    break;
                case 'class':
                    attribute = item.className;
                    break;
                case 'data':
                    attribute = item.data;
                    break;
                case 'value':
                    attribute = item.attribute;
                    break;
                // case 'style':
                //     item.style = value;
                //     break;
                case 'innerText':
                case 'inner-text':
                    // console.log(item.innerText);
                    attribute = item.innerText;
                    break;
                case 'innerHtml':
                case 'inner-html':
                    attribute = item.innerHTML;
            }
        });

        // return attribute;
    };


    // /**
    //  * Function for setting inn
    //  * @param text
    //  * @returns {Constructor}
    //  */
    // Constructor.prototype.setInnerText = function (text) {
    //     this.each(function (item) {
    //         item.innerText = text;
    //     });
    //     return this;
    // };
    //
    // /**
    //  *
    //  * @param innerHtml
    //  * @returns {Constructor}
    //  */
    // Constructor.prototype.setInnerHtml = function (innerHtml) {
    //     this.each(function (item) {
    //         item.innerHTML = innerHtml;
    //     });
    //     return this;
    // };

    /**
     * Function for getting the parent(s) of the element(s)
     * @returns {Constructor}
     */
    Constructor.prototype.getParent = function () {
        let parents = instantiate();
        this.each(function (item) {
            parents.elems.push(item.parentNode);
        });
        return parents;
    };

    /**
     * Function for getting the children of the element(s)
     * @returns {Constructor}
     */
    Constructor.prototype.getChildren = function () {
        let children = instantiate();
        this.each(function (item) {
            let itemChildren = Array.from(item.children);
            itemChildren.forEach(function (child) {
                children.elems.push(child);

            });
        });
        return children;
    };

    /**
     * Function for getting the next sibling of the element(s)
     * @returns {Constructor}
     */
    Constructor.prototype.getNextSibling = function () {
        let nextSiblings = instantiate();
        this.each(function (item) {
            nextSiblings.elems.push(item.nextElementSibling);
        });
        return nextSiblings;
    };

    /**
     * Function for getting the previous sibling of the element(s)
     * @returns {Constructor}
     */
    Constructor.prototype.getPreviousSibling = function () {
        let previousSiblings = instantiate();
        this.each(function (item) {
            previousSiblings.elems.push(item.previousElementSibling);
        });
        return previousSiblings;
    };

    /**
     * Return the constructor instantiation
     */
    return instantiate;

})();
