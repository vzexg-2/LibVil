set_title('V1.0.1 | by @sunshine');

createFolder.opt1('Brawl');
scriptName.infolder.opt1('double enemy xp', `
(() => {
    let iframe = document.querySelector("iframe");
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.append(iframe);
    }
    if (window.fetch.call.toString() == 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }

    const cheat = async () => {
        const colliders = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.colliders._active
            .filter(x => x.callbackContext?.toString?.()?.includes?.('dmgCd'));

        for (let i = 0; i < colliders.length; i++) {
            const enemies = colliders[i].object2;
            let _start = enemies.classType.prototype.start;
            enemies.classType.prototype.start = function () { 
                _start.apply(this, arguments); 
                this.val *= 2; 
            };
            enemies.children.entries.forEach(e => e.val *= 2);
        }
    };
    cheat();
})();
`);

scriptName.infolder.opt1('Instant Kill', `
(() => {
    let iframe = document.querySelector("iframe");
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.append(iframe);
    }
    if (window.fetch.call.toString() == 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }
    const cheat = async () => {
        const colliders = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.colliders._active
            .filter(x => x.callbackContext?.toString?.()?.includes?.('dmgCd'));
        for (let i = 0; i < colliders.length; i++) {
            const enemies = colliders[i].object2;
            let _start = enemies.classType.prototype.start;
            enemies.classType.prototype.start = function () { 
                _start.apply(this, arguments); 
                this.hp = 1; 
            };
            enemies.children.entries.forEach(e => e.hp = 1);
        }
    };
    cheat();
})();
`);

scriptName.infolder.opt1('Invincibility', `
(() => {
    let iframe = document.querySelector("iframe");
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.append(iframe);
    }
    if (window.fetch.call.toString() == 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }
    const cheat = async () => {
        for (const collider of Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.colliders._active
            .filter(x => x.callbackContext?.toString().includes('invulnerableTime') || x.callbackContext?.toString().includes('dmgCd'))) {
            collider.collideCallback = () => {};
        }
    };
    cheat();
})();
`);

scriptName.infolder.opt1('Kill Enemies', `
(() => {
    if (window.fetch.call.toString() == 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }
    const cheat = async () => {
        Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.bodies.entries
        .forEach(x => x?.gameObject?.receiveDamage?.(x.gameObject.hp, 1));
    };
    cheat();
})();
`);

scriptName.infolder.opt1('Magnet', `
(() => {
    if (window.fetch.call.toString() == 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }
    const cheat = async () => {
        Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.colliders._active
        .find(x => x.collideCallback?.toString().includes('magnetTime'))
        .collideCallback({ active: true }, { active: true, setActive() {}, setVisible() {} });
    };
    cheat();
})();
`);

scriptName.infolder.opt1('Max Abilities', `
(() => {
    if (window.fetch.call.toString() == 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }
    const cheat = async () => {
        const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner;
        for (const [ability, level] of Object.entries(stateNode.state.abilities)) {
            for (let i = 0; i < (10 - level); i++) {
                stateNode.game.current.config.sceneConfig.game.events.emit("level up", ability, stateNode.state.abilities[ability]++);
            }
        }
        stateNode.setState({
            level: stateNode.game.current.config.sceneConfig.level = [1, 3, 5, 10, 15, 25, 35]
                .sort((a, b) => Math.abs(a - stateNode.state.level) - Math.abs(b - stateNode.state.level))[0] - 1
        });
    };
    cheat();
})();
`);

scriptName.infolder.opt1('Next level', `
(() => {
    if (window.fetch.call.toString() == 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }
    const cheat = async () => {
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner;
        let { object1: player, object2: xp } = stateNode.game.current.config.sceneConfig.physics.world.colliders._active
            .find(x => x.collideCallback?.toString().includes('emit("xp'));
        xp.get().spawn(
            player.x, 
            player.y, 
            ((e) => e === 1 ? 1 : e < 5 ? 5 : e < 10 ? 10 : e < 20 ? 20 : e < 30 ? 30 : e < 40 ? 40 : e < 50 ? 50 : 100)(stateNode.state.level) - stateNode.xp
        );
    };
    cheat();
})();
`);

scriptName.infolder.opt1('Remove obstacles', `
(() => {
    if (window.fetch.call.toString() == 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }
    const cheat = async () => {
        Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.bodies.entries.forEach(body => { 
            try { 
                if (body.gameObject.frame.texture.key.includes("obstacle")) body.gameObject.destroy(); 
            } catch {} 
        });
    };
    cheat();
})();
`);

createFolder.opt2('Cafe');
scriptName.infolder.opt2('Max items', `
(() => {
    const cheat = async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.alert = i.contentWindow.alert.bind(window);
        i.remove();
        if (window.location.pathname !== "/cafe/shop") alert("This can only be run in the shop");
        else {
            const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
            })())[1].children[0]._owner;
            stateNode.setState({ items: Object.keys(stateNode.state.items).reduce((obj, item) => (obj[item] = 5, obj), {}) });
        }
    };
    cheat();
})();
`);

scriptName.infolder.opt2('Set cash', `
(() => {
    const cheat = async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();
        let cafeCash = parseInt(prompt("How much cash would you like?")) || 0;
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner;
        stateNode.setState({ cafeCash });
        stateNode.props.liveGameController.setVal({
            path: "c/" + stateNode.props.client.name + "/ca",
            val: cafeCash
        });
    };
    cheat();
})();
`);

scriptName.infolder.opt2('Stock food', `
(() => {
    const cheat = async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.alert = i.contentWindow.alert.bind(window);
        i.remove();
        if (window.location.pathname !== "/cafe") {
            alert("This can't be run in the shop");
        } else {
            const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
            })())[1].children[0]._owner;
            stateNode.setState({ foods: stateNode.state.foods.map(e => ({ ...e, stock: 99, level: 5 })) });
        }
    };
    cheat();
})();
`);

// CONTINUE : Crypto.
