set_title('V1.0.1 | by @sunshine');

createFolder.opt1('Brawl');
scriptName.infolder.opt1('Double enemy xp', `
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

createFolder.opt3('Crypto')
scriptName.infolder.opt3('Always triple crypto', `
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
    const timeProcessed = 1730769903666;
    let latestProcess = -1;
    const cheat = (async () => {
        window.setInterval(state => Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner.stateNode.setState(state), 25, { choices: [{ type: "mult", val: 3, rate: 0.075, blook: "Brainy Bot", text: "Triple Crypto" }] });
    });
    let img = new Image;
    img.src = "https://raw.githubusercontent.com/Blooket-Council/Blooket-Cheats/main/autoupdate/timestamps/crypto/alwaysTriple.png?" + Date.now();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height);
        let { data } = ctx.getImageData(0, 0, this.width, this.height), decode = "", last;
        let i = 0;
        while (i < data.length) {
            let char = String.fromCharCode(data[i % 4 == 3 ? (i++, i++) : i++] + data[i % 4 == 3 ? (i++, i++) : i++] * 256);
            decode += char;
            if (char == "/" && last == "*") break;
            last = char;
        }
        let _, time = timeProcessed, error = "There was an error checking for script updates. Run cheat anyway?";
        try {
            [_, time, error] = decode.match(/LastUpdated: (.+?); ErrorMessage: "((.|\n)+?)"/);
        } catch (e) {}
        if ((latestProcess = parseInt(time)) <= timeProcessed || iframe.contentWindow.confirm(error)) cheat();
    }
    img.onerror = img.onabort = () => {
        img.onerror = img.onabort = null;
        cheat();
        let iframe = document.querySelector("iframe");
        iframe.contentWindow.alert("It seems the GitHub is either blocked or down.\n\nIf it's NOT blocked, join the Discord server for updates\nhttps://discord.gg/jHjGrrdXP6\n(The cheat will still run after this alert)")
    }
})();
    `);

scriptName.infolder.opt3('Auto guess', `
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
    const timeProcessed = 1730769903757;
    let latestProcess = -1;
    const cheat = (async () => {
        let { state } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner.stateNode;
        if (state.stage == "hack") for (const button of document.querySelector('div[class*=buttonContainer]').children) button.innerText == state.correctPassword && button.click();
    });
    cheat();
})();
    `);

scriptName.infolder.opt3('Choice ESP', `
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
    const timeProcessed = 1730769903863;
    let latestProcess = -1;
    const cheat = (async () => {
        let chest = document.querySelector('[class*=feedbackContainer]');
        if (chest.children.length <= 4) {
            let choice = document.createElement('div')
            choice.style.color = "white";
            choice.style.fontFamily = "Inconsolata,Helvetica,monospace,sans-serif";
            choice.style.fontSize = "2em";
            choice.style.display = "flex";
            choice.style.justifyContent = "center";
            choice.style.marginTop = "675px";
            choice.innerText = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner.state.choices[0].text;
            chest.append(choice);
        }
    });
    cheat();
})();
`);

scriptName.infolder.opt3('Password esp', `
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
    const timeProcessed = 1730769903936;
    let latestProcess = -1;
    const cheat = (async () => {
        let { state } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner.stateNode;
        if (state.stage == "hack") for (const button of document.querySelector('div[class*=buttonContainer]').children) {
            if (button.innerText == state.correctPassword) continue;
            button.style.outlineColor = "rgba(255, 64, 64, 0.8)";
            button.style.backgroundColor = "rgba(255, 64, 64, 0.8)";
            button.style.textShadow = "0 0 1px #f33"
        };
    });
    cheat();
})();
    `);

scripName.infolder.opt3('Set crypto', `
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
    const timeProcessed = 1730769904085;
    let latestProcess = -1;
    const cheat = (async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();
        let amount = parseInt(prompt("How much crypto would you like?")) || 0;
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
        stateNode.setState({ crypto: amount, crypto2: amount });
        stateNode.props.liveGameController.setVal({
            path: "c/" + stateNode.props.client.name + "/cr",
            val: amount
        });
    });
    cheat();
})();
    `);

scriptName.infolder.opt3('Set password', `
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
    const timeProcessed = 1730769904165;
    let latestProcess = -1;
    const cheat = (async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();
        let password = prompt("What do you want to set your password to?");
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
        stateNode.setState({ password });
        stateNode.props.liveGameController.setVal({
            path: "c/" + stateNode.props.client.name + "/p",
            val: password
        });
    });
    cheat();
})();
    `);

scriptName.infolder.opt3('Steal crypto', `
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
    const timeProcessed = 1730769904235;
    let latestProcess = -1;
    const cheat = (async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();
        let target = prompt("Who's crypto would you like to steal?");
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
        stateNode.props.liveGameController.getDatabaseVal("c", (players) => {
            let player;
            if (players && (player = Object.entries(players).find((x) => x[0].toLowerCase() == target.toLowerCase()))) {
                const cr = player[1].cr;
                stateNode.setState({
                    crypto: stateNode.state.crypto + cr,
                    crypto2: stateNode.state.crypto + cr
                });
                stateNode.props.liveGameController.setVal({
                    path: "c/" + stateNode.props.client.name,
                    val: {
                        b: stateNode.props.client.blook,
                        p: stateNode.state.password,
                        cr: stateNode.state.crypto + cr,
                        tat: player[0] + ":" + cr
                    }
                });
            }
        })
    });
    cheat();
})();    
`);

createFolder.opt4("Dinos")
scriptName.infolder.opt4('Auto Guess', `
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

    const cheat = (async () => {
        function rand(e, t) {
            const s = [];
            while (s.length < t) {
                const i = Math.random();
                let r = 0, g = null;
                for (let o = 0; o < e.length; o++) {
                    r += e[o].rate;
                    if (r >= i) {
                        g = e[o];
                        break;
                    }
                }
                g && !s.includes(g) && s.push(g);
            }
            return s;
        }

        try {
            let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) {
                return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div"));
            })())[1].children[0]._owner;

            if (stateNode.state.stage === "excavate") {
                stateNode.state.choices.length || (stateNode.state.choices = rand([
                    { type: "fossil", val: 10, rate: .1, blook: "Amber" },
                    { type: "fossil", val: 25, rate: .1, blook: "Dino Egg" },
                    { type: "fossil", val: 50, rate: .175, blook: "Dino Fossil" },
                    { type: "fossil", val: 75, rate: .175, blook: "Stegosaurus" },
                    { type: "fossil", val: 100, rate: .15, blook: "Velociraptor" },
                    { type: "fossil", val: 125, rate: .125, blook: "Brontosaurus" },
                    { type: "fossil", val: 250, rate: .075, blook: "Triceratops" },
                    { type: "fossil", val: 500, rate: .025, blook: "Tyrannosaurus Rex" },
                    { type: "mult", val: 1.5, rate: .05 },
                    { type: "mult", val: 2, rate: .025 }
                ], 3));

                let max = 0, index = -1;
                for (let i = 0; i < stateNode.state.choices.length; i++) {
                    const { type, val } = stateNode.state.choices[i];
                    const value = (type == "fossil" ? stateNode.state.fossils + val * stateNode.state.fossilMult : stateNode.state.fossils * val) || 0;
                    if (value <= max && type != "mult") continue;
                    max = value;
                    index = i + 1;
                }

                document.querySelector('div[class*=rockRow] > div[role="button"]:nth-child(' + index + ')').click();
            }
        } catch { }
    });

    cheat();
})();
`);

scriptName.infolder.opt4('Rock esp', `
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

    const cheat = (async () => {
        function rand(e, t) {
            const s = [];
            while (s.length < t) {
                const i = Math.random();
                let r = 0;
                let g;
                for (let o = 0; o < e.length; o++) {
                    r += e[o].rate;
                    if (r >= i) {
                        g = e[o];
                        break;
                    }
                }
                if (g && !s.includes(g)) s.push(g);
            }
            return s;
        };
        
        const exps = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
        function getExpAscii(num) {
            let res = "";
            while (num > 0) {
                res = exps[num % 10] + res;
                num = Math.floor(num / 10);
            }
            return res;
        };
        
        function shortNum(value) {
            const reg = RegExp("[^a-zA-Z 0-9]+", "g");
            let newValue = value.toString();
            if (value >= 1000) {
                const suffixes = ["", "K", "M", "B", "T"];
                const suffixNum = Math.floor(Math.floor((Math.log(value) / Math.log(10)).toPrecision(14)) / 3);
                if (suffixNum < suffixes.length) {
                    let shortValue = "";
                    for (let precision = 3; precision >= 1; precision--) {
                        shortValue = parseFloat((suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(precision)).toString();
                        const dotLessShortValue = shortValue.replace(reg, "");
                        if (dotLessShortValue.length <= 3) break;
                    }
                    if (Number(shortValue) % 1 != 0) shortValue = Number(shortValue).toFixed(1);
                    newValue = shortValue + suffixes[suffixNum];
                } else {
                    let num = value;
                    let exp = 0;
                    while (num >= 100) {
                        num = Math.floor(num / 10);
                        exp += 1;
                    }
                    newValue = num / 10 + " × 10" + getExpAscii(exp + 1);
                }
            }
            return newValue;
        };
        
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
        const rocks = document.querySelector('[class*="rockButton"]').parentElement.children;
        
        if (!Array.prototype.every.call(rocks, element => element.querySelector('div'))) stateNode.setState({
            choices: rand([{ type: "fossil", val: 10, rate: 0.1, blook: "Amber" }, { type: "fossil", val: 25, rate: 0.1, blook: "Dino Egg" }, { type: "fossil", val: 50, rate: 0.175, blook: "Dino Fossil" }, { type: "fossil", val: 75, rate: 0.175, blook: "Stegosaurus" }, { type: "fossil", val: 100, rate: 0.15, blook: "Velociraptor" }, { type: "fossil", val: 125, rate: 0.125, blook: "Brontosaurus" }, { type: "fossil", val: 250, rate: 0.075, blook: "Triceratops" }, { type: "fossil", val: 500, rate: 0.025, blook: "Tyrannosaurus Rex" }, { type: "mult", val: 1.5, rate: 0.05 }, { type: "mult", val: 2, rate: 0.025 }], 3)
        }, () => {
            Array.prototype.forEach.call(rocks, (element, index) => {
                const rock = stateNode.state.choices[index];
                if (element.querySelector('div')) element.querySelector('div').remove();
                const choice = document.createElement("div");
                choice.style.color = "white";
                choice.style.fontFamily = "Macondo";
                choice.style.fontSize = "1em";
                choice.style.display = "flex";
                choice.style.justifyContent = "center";
                choice.style.transform = "translateY(25px)";
                choice.innerText = rock.type === "fossil" ? "+".concat(Math.round(rock.val * stateNode.state.fossilMult) > 99999999 ? shortNum(Math.round(rock.val * stateNode.state.fossilMult)) : Math.round(rock.val * stateNode.state.fossilMult)).concat(" Fossils") : "x".concat(rock.val, " Fossils Per Excavation");
                element.append(choice);
            });
        });
    });

    cheat();
})();
    `);

scriptName.infolder.opt4('Set fossils', `
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

    const cheat = (async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();
        let fossils = parseInt(prompt("How many fossils would you like?")) || 0;
        let stateNode = Object.values((function react(r) {
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div"))
        })(document.querySelector("body>div")))[1].children[0]._owner.stateNode;
        stateNode.setState({ fossils: fossils });
        stateNode.props.liveGameController.setVal({
            path: "c/" + stateNode.props.client.name + "/f",
            val: fossils
        });
    });

    cheat();
})();
    `);

scriptName.infolder.opt4('Set multiplier', `
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

    const cheat = (async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();
        let fossils = parseInt(prompt("How many fossils would you like?")) || 0;
        let stateNode = Object.values((function react(r) {
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div"))
        })(document.querySelector("body>div")))[1].children[0]._owner.stateNode;
        stateNode.setState({ fossils: fossils });
        stateNode.props.liveGameController.setVal({
            path: "c/" + stateNode.props.client.name + "/f",
            val: fossils
        });
    });

    cheat();
})();    
`);

createFolder.fishing("Fishing");
scripName.infolder.fishing('Frenzy', `
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

    const cheat = (async () => {
        let stateNode = Object.values((function react(r) {
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div"));
        })(document.querySelector("body>div")))[1].children[0]._owner.stateNode;

        stateNode.props.liveGameController.setVal({
            path: "c/" + stateNode.props.client.name,
            val: {
                b: stateNode.props.client.blook,
                w: stateNode.state.weight,
                f: "Frenzy",
                s: true
            }
        });
    });

    cheat();
})();
`);

scriptName.infolder.fishing('Set lure', `
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

    const cheat = (async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();

        Object.values((function react(r) {
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div"));
        })(document.querySelector("body>div")))[1].children[0]._owner.stateNode.setState({
            lure: Math.max(Math.min((parseInt(prompt("What would you like to set your lure to? (1 - 5)")) || 0) - 1, 4), 0)
        });
    });

    cheat();
})();
`);

scriptName.infolder.fishing('Set weight', `
(() => {
    let iframe = document.querySelector("iframe");
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.append(iframe);
    }
    if (window.fetch.call.toString() == "function call() { [native code] }") {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }
    const cheat = (async () => {
        let i = document.createElement("iframe");
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();
        let weight = parseInt(prompt("How much weight would you like?")) || 0;
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner;
        stateNode.setState({ weight, weight2: weight });
        stateNode.props.liveGameController.setVal({
            path: "c/" + stateNode.props.client.name,
            val: {
                b: stateNode.props.client.blook,
                w: weight,
                f: ["Crab", "Jellyfish", "Frog", "Pufferfish", "Octopus", "Narwhal", "Megalodon", "Blobfish", "Baby Shark"][Math.floor(Math.random() * 9)]
            }
        });
    });
    cheat();
})();
`);

createFolder.fact("Factory");
scriptName.infolder.fact('Choose block', `
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
    const cheat = (async () => {  
        const prices = [0, 0, 0, 0];  
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) {  
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div"))  
        })())[1].children[0]._owner;  
        stateNode.setState({ blooks: stateNode.state.blooks.map(blook => (blook.price = prices, blook)) });  
    });  
    cheat();  
})();
`);

scriptName.infolder.fact('Free upgrades', `
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
    const cheat = (async () => {
        const prices = [0, 0, 0, 0];
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode 
                ? r 
                : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner;
        stateNode.setState({ blooks: stateNode.state.blooks.map(blook => (blook.price = prices, blook)) });
    });
    cheat();
})();
`);

scriptName.infolder.fact('Max blocks', `
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
        Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode 
                ? r 
                : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner.stateNode.state.blooks.forEach(blook => blook.level = 4);
    };
    cheat();
})();
`);

scriptName.infolder.fact('Set cash', `
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
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();
        Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode 
                ? r 
                : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner.stateNode.setState({ 
            cash: parseInt(prompt("How much cash would you like?")) || 0 
        });
    };
    cheat();
})();
`);

scriptName.infolder.fact('All megabots', `
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
        Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode 
                ? r 
                : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner.stateNode.setState({
            blooks: Array.from({ length: 10 }, () => ({
                name: "Mega Bot",
                color: "#d71f27",
                class: "🤖",
                rarity: "Legendary",
                cash: [80000, 430000, 4200000, 62000000, 1000000000],
                time: [5, 5, 3, 3, 3],
                price: [7000000, 120000000, 1900000000, 35000000000],
                active: false,
                level: 4,
                bonus: 5.5
            }))
        });
    };
    cheat();
})();
`);