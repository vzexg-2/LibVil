(function () {
    'use strict';
    if (window.libvil) {
        console.warn('libvil already loaded!');
        return;
    }
    set_title = () => console.error('libvil not fully initialized yet. Try again shortly.');
    createFolder = new Proxy({}, {
        get: () => () => console.error('libvil not fully initialized yet. Try again shortly.')
    });
    scriptName = new Proxy({}, {
        get: (_, prop) => {
            if (prop === 'infolder') {
                return new Proxy({}, {
                    get: () => () => console.error('libvil not fully initialized yet. Try again shortly.')
                });
            }
            return () => console.error('libvil not fully initialized yet. Try again shortly.');
        }
    });
    class libvil {
        constructor() {
            this.box = null;
            this.body = null;
            this.dirs = {};
            this.cmds = {};
            this.dirCmds = {};
            this.curDir = null;
            this.title = 'Blooket | By Sunshine';
            this.search = null;
            this.log = [];
            this.logBox = null;
            this.isMob = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
            this.isDesk = /win|mac|linux|cros/i.test(navigator.userAgent.toLowerCase()) && !this.isMob;
            this.isMin = false;
            this.go();
        }
        go() {
            this.box = document.createElement('div');
            const w = this.isMob ? '270px' : this.isDesk ? '400px' : '300px';
            const h = this.isMob ? '350px' : this.isDesk ? '500px' : '380px';
            const titleSz = this.isMob ? '12px' : this.isDesk ? '15px' : '13px';
            const btnSz = this.isMob ? '12px' : this.isDesk ? '14px' : '13px';
            const searchSz = this.isMob ? '11px' : this.isDesk ? '13px' : '12px';
            const bodyH = this.isMob ? '90px' : this.isDesk ? '110px' : '100px';
            this.minH = this.isMob ? '32px' : this.isDesk ? '40px' : '36px';
            this.box.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: ${w};
                max-width: 90vw;
                height: ${h};
                max-height: 80vh;
                background: linear-gradient(145deg, #1a1a1a, #111);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.05);
                z-index: 10000;
                overflow: hidden;
                transition: opacity 0.2s ease, height 0.2s ease;
            `;
            const bar = document.createElement('div');
            bar.style.cssText = `
                background: linear-gradient(90deg, #2a2a2a, #222);
                padding: ${this.isMob ? '6px 10px' : '8px 12px'};
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: move;
            `;
            const title = document.createElement('div');
            title.style.cssText = `
                color: #d0d0d0;
                font-size: ${titleSz};
                font-weight: 600;
                flex: 1;
                text-align: center;
                text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
            `;
            title.textContent = this.title;
            if (!document.getElementById('libvil-styles')) {
                const style = document.createElement('style');
                style.id = 'libvil-styles';
                style.textContent = `
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
                    .libvil-scrollbar::-webkit-scrollbar {
                        width: 5px;
                    }
                    .libvil-scrollbar::-webkit-scrollbar-track {
                        background: #2a2a2a;
                        border-radius: 3px;
                    }
                    .libvil-scrollbar::-webkit-scrollbar-thumb {
                        background: #555;
                        border-radius: 3px;
                    }
                    .libvil-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #777;
                    }
                    .libvil-animate {
                        transition: opacity 0.2s ease;
                    }
                    .libvil-button, .libvil-folder, .libvil-back {
                        transition: background 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
                    }
                    .libvil-button:hover, .libvil-folder:hover, .libvil-back:hover {
                        background: linear-gradient(145deg, #333, #2a2a2a) !important;
                        transform: scale(1.02);
                        box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
                    }
                    .libvil-loading::after {
                        content: '⏳';
                        margin-left: 8px;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
            const minBtn = document.createElement('button');
            minBtn.textContent = '-';
            minBtn.style.cssText = `
                background: none;
                border: none;
                color: #d0d0d0;
                font-size: ${this.isMob ? '14px' : '16px'};
                cursor: pointer;
                padding: 4px 8px;
            `;
            minBtn.onclick = () => this.min();
            minBtn.onmouseenter = () => (minBtn.style.color = '#ffffff');
            minBtn.onmouseleave = () => (minBtn.style.color = '#d0d0d0');
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.style.cssText = `
                background: none;
                border: none;
                color: #d0d0d0;
                font-size: ${this.isMob ? '14px' : '16px'};
                cursor: pointer;
                padding: 4px 8px;
            `;
            closeBtn.onclick = () => this.close();
            closeBtn.onmouseenter = () => (closeBtn.style.color = '#ffffff');
            closeBtn.onmouseleave = () => (closeBtn.style.color = '#d0d0d0');
            bar.appendChild(minBtn);
            bar.appendChild(title);
            bar.appendChild(closeBtn);
            const searchDiv = document.createElement('div');
            searchDiv.className = 'libvil-search';
            searchDiv.style.cssText = `
                padding: ${this.isMob ? '6px' : '8px'};
                background: #1a1a1a;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            `;
            this.search = document.createElement('input');
            this.search.type = 'text';
            this.search.placeholder = 'Search...';
            this.search.style.cssText = `
                width: 100%;
                padding: ${this.isMob ? '5px 6px' : '6px 8px'};
                background: #2a2a2a;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                color: #d0d0d0;
                font-size: ${searchSz};
                box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
            `;
            this.search.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => this.find(e.target.value), 150);
            });
            searchDiv.appendChild(this.search);
            this.body = document.createElement('div');
            this.body.className = 'libvil-scrollbar';
            this.body.style.cssText = `
                padding: ${this.isMob ? '8px' : '10px'};
                height: calc(100% - ${bodyH});
                overflow-y: auto;
                background: #1a1a1a;
            `;
            this.logBox = document.createElement('div');
            this.logBox.style.cssText = `
                padding: ${this.isMob ? '6px' : '8px'};
                background: #2a2a2a;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                color: #d0d0d0;
                font-size: ${this.isMob ? '10px' : '11px'};
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `;
            this.box.appendChild(bar);
            this.box.appendChild(searchDiv);
            this.box.appendChild(this.body);
            this.box.appendChild(this.logBox);
            document.body.appendChild(this.box);
            this.titleEl = title;
            this.searchDiv = searchDiv;
            this.minBtn = minBtn;
            let isDragging = false;
            let startX, startY;
            let rafId = null;
            const dragStart = (x, y, isTouch = false) => {
                isDragging = true;
                const rect = this.box.getBoundingClientRect();
                startX = x - rect.left;
                startY = y - rect.top;
                if (!isTouch) {
                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onUp);
                }
            };
            const move = (x, y) => {
                const maxX = window.innerWidth - this.box.offsetWidth;
                const maxY = window.innerHeight - this.box.offsetHeight;
                const newX = Math.max(0, Math.min(x - startX, maxX));
                const newY = Math.max(0, Math.min(y - startY, maxY));
                this.box.style.left = `${newX}px`;
                this.box.style.top = `${newY}px`;
                this.box.style.transform = 'none';
            };
            const onMove = (e) => {
                if (!isDragging) return;
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => move(e.clientX, e.clientY));
            };
            const onTouchMove = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const touch = e.touches[0];
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => move(touch.clientX, touch.clientY));
            };
            const onUp = () => {
                isDragging = false;
                cancelAnimationFrame(rafId);
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            };
            const onTouchEnd = () => {
                isDragging = false;
                cancelAnimationFrame(rafId);
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            };
            bar.addEventListener('mousedown', (e) => {
                if (e.target === closeBtn || e.target === minBtn) return;
                dragStart(e.clientX, e.clientY);
            });
            bar.addEventListener('touchstart', (e) => {
                if (e.target === closeBtn || e.target === minBtn) return;
                const touch = e.touches[0];
                dragStart(touch.clientX, touch.clientY, true);
                document.addEventListener('touchmove', onTouchMove, { passive: false });
                document.addEventListener('touchend', onTouchEnd);
            });
            this.box.style.opacity = '0';
            requestAnimationFrame(() => {
                this.box.style.opacity = '1';
                this.box.style.transform = 'translate(-50%, -50%)';
            });
        }
        min() {
            this.isMin = !this.isMin;
            if (this.isMin) {
                this.box.style.height = this.minH;
                this.searchDiv.style.display = 'none';
                this.body.style.display = 'none';
                this.logBox.style.display = 'none';
                this.minBtn.textContent = '+';
            } else {
                this.box.style.height = this.isMob ? '350px' : this.isDesk ? '500px' : '380px';
                this.searchDiv.style.display = '';
                this.body.style.display = '';
                this.logBox.style.display = '';
                this.minBtn.textContent = '-';
                this.curDir ? this.open(this.curDir, this.dirs[this.curDir].name) : this.main();
            }
            this.addLog(this.isMin ? 'Minimized' : 'Restored');
        }
        set(title) {
            if (!this.titleEl) {
                console.error('libvil not fully initialized. Try again shortly.');
                return;
            }
            if (typeof title !== 'string') {
                this.addLog('Error: Invalid title');
                return;
            }
            this.title = title;
            this.titleEl.textContent = title;
        }
        createFolder(id, name, parentId = null) {
            if (!this.body) {
                console.error('libvil not fully initialized. Try again shortly.');
                return;
            }
            if (this.dirs[id]) {
                this.addLog(`Error: Folder ${id} already exists`);
                return;
            }
            const folder = document.createElement('div');
            folder.classList.add('libvil-folder', 'libvil-animate');
            folder.style.cssText = `
                background: linear-gradient(145deg, #222, #1a1a1a);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                padding: ${this.isMob ? '8px' : '10px'};
                margin-bottom: 6px;
                color: #d0d0d0;
                font-size: ${this.isMob ? '12px' : this.isDesk ? '14px' : '13px'};
                cursor: pointer;
                box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
            `;
            folder.textContent = `📁 ${name}`;
            folder.title = name;
            folder.onclick = () => this.open(id, name);
            if (parentId && !this.dirs[parentId]) {
                this.addLog(`Error: Parent folder ${parentId} does not exist`);
                return;
            }
            if (parentId) {
                this.dirs[parentId].scripts.push(id);
                this.dirCmds[parentId][id] = { type: 'folder', name };
            } else {
                this.body.appendChild(folder);
            }
            this.dirs[id] = { element: folder, name, scripts: [], parent: parentId };
            this.dirCmds[id] = {};
            this.addLog(`Created folder: ${name}`);
        }
        btn(name, script, folderId = null) {
            if (!this.body) {
                console.error('libvil not fully initialized. Try again shortly.');
                return;
            }
            const button = document.createElement('button');
            button.classList.add('libvil-button', 'libvil-animate');
            button.style.cssText = `
                background: linear-gradient(145deg, #222, #1a1a1a);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                padding: ${this.isMob ? '8px' : '10px'};
                margin-bottom: 6px;
                width: 100%;
                color: #d0d0d0;
                font-size: ${this.isMob ? '12px' : this.isDesk ? '14px' : '13px'};
                text-align: left;
                cursor: pointer;
                box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
            `;
            button.textContent = name;
            button.title = name;
            button.onclick = () => this.run(script, button);
            if (folderId) {
                this.dirCmds[folderId][name] = script;
            } else {
                this.body.appendChild(button);
                this.cmds[name] = script;
            }
        }
        createFolderScript(folderId, name, script) {
            if (!this.body) {
                console.error('libvil not fully initialized. Try again shortly.');
                return;
            }
            if (!this.dirs[folderId]) {
                this.addLog(`Error: Folder ${folderId} does not exist`);
                return;
            }
            this.btn(name, script, folderId);
            this.addLog(`Created script: ${name} in folder ${folderId}`);
        }
        open(folderId, folderName) {
            if (!this.body) {
                console.error('libvil not fully initialized. Try again shortly.');
                return;
            }
            if (!this.dirs[folderId]) {
                this.addLog(`Error: Folder ${folderId} not found`);
                return;
            }
            this.curDir = folderId;
            this.body.innerHTML = '';
            this.body.style.opacity = '0';
            const frag = document.createDocumentFragment();
            const backBtn = document.createElement('button');
            backBtn.classList.add('libvil-back', 'libvil-animate');
            backBtn.style.cssText = `
                background: linear-gradient(145deg, #222, #1a1a1a);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                padding: ${this.isMob ? '6px 10px' : '8px 12px'};
                margin-bottom: 10px;
                color: #d0d0d0;
                font-size: ${this.isMob ? '12px' : this.isDesk ? '14px' : '13px'};
                cursor: pointer;
                box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
            `;
            backBtn.textContent = '← Back';
            backBtn.onclick = () => this.main();
            frag.appendChild(backBtn);
            const folderTitle = document.createElement('div');
            folderTitle.style.cssText = `
                color: #d0d0d0;
                font-size: ${this.isMob ? '13px' : this.isDesk ? '15px' : '14px'};
                font-weight: 600;
                margin-bottom: 10px;
                text-align: center;
                text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
            `;
            folderTitle.textContent = `📁 ${folderName}`;
            frag.appendChild(folderTitle);
            const items = this.dirCmds[folderId];
            for (const [key, value] of Object.entries(items)) {
                if (value.type === 'folder') {
                    const subFolder = this.dirs[key].element.cloneNode(true);
                    subFolder.onclick = () => this.open(key, value.name);
                    frag.appendChild(subFolder);
                } else {
                    const button = document.createElement('button');
                    button.classList.add('libvil-button', 'libvil-animate');
                    button.style.cssText = `
                        background: linear-gradient(145deg, #222, #1a1a1a);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 4px;
                        padding: ${this.isMob ? '8px' : '10px'};
                        margin-bottom: 6px;
                        width: 100%;
                        color: #d0d0d0;
                        font-size: ${this.isMob ? '12px' : this.isDesk ? '14px' : '13px'};
                        text-align: left;
                        cursor: pointer;
                        box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
                    `;
                    button.textContent = key;
                    button.title = key;
                    button.onclick = () => this.run(value, button);
                    frag.appendChild(button);
                }
            }
            this.body.appendChild(frag);
            requestAnimationFrame(() => {
                this.body.style.opacity = '1';
            });
            this.addLog(`Opened folder: ${folderName}`);
        }
        main() {
            if (!this.body) {
                console.error('libvil not fully initialized. Try again shortly.');
                return;
            }
            this.curDir = null;
            this.body.innerHTML = '';
            this.body.style.opacity = '0';
            const frag = document.createDocumentFragment();
            for (const folder of Object.values(this.dirs).filter((f) => !f.parent)) {
                frag.appendChild(f.element);
            }
            for (const [name, script] of Object.entries(this.cmds)) {
                const button = document.createElement('button');
                button.classList.add('libvil-button', 'libvil-animate');
                button.style.cssText = `
                    background: linear-gradient(145deg, #222, #1a1a1a);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    padding: ${this.isMob ? '8px' : '10px'};
                    margin-bottom: 6px;
                    width: 100%;
                    color: #d0d0d0;
                    font-size: ${this.isMob ? '12px' : this.isDesk ? '14px' : '13px'};
                    text-align: left;
                    cursor: pointer;
                    box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
                `;
                button.textContent = name;
                button.title = name;
                button.onclick = () => this.run(script, button);
                frag.appendChild(button);
            }
            this.body.appendChild(frag);
            requestAnimationFrame(() => {
                this.body.style.opacity = '1';
            });
            this.addLog('Returned to main view');
        }
        run(script, button) {
            if (button) button.classList.add('libvil-loading');
            setTimeout(() => {
                try {
                    if (typeof script === 'function') {
                        script();
                    } else {
                        eval(script);
                    }
                    this.addLog('Script executed successfully');
                } catch (error) {
                    this.addLog(`Error: ${error.message}`);
                    console.error('Script execution error:', error);
                } finally {
                    if (button) button.classList.remove('libvil-loading');
                }
            }, 100);
        }
        addLog(msg) {
            this.log.push(`${new Date().toLocaleTimeString()}: ${msg}`);
            if (this.log.length > 3) this.log.shift();
            this.logBox.textContent = this.log.join(' | ');
        }
        find(term) {
            if (!this.body) {
                console.error('libvil not fully initialized. Try again shortly.');
                return;
            }
            const children = Array.from(this.body.children);
            const isFolderOpen = !!this.curDir;
            const exceptions = isFolderOpen ? ['libvil-back'] : [];
            children.forEach((el) => {
                if (exceptions.some((cls) => el.classList.contains(cls))) {
                    el.style.display = '';
                } else {
                    const text = el.textContent.toLowerCase();
                    el.style.display = text.includes(term.toLowerCase()) ? '' : 'none';
                }
            });
        }
        close() {
            this.box.style.opacity = '0';
            setTimeout(() => {
                if (this.box && this.box.parentNode) {
                    this.box.parentNode.removeChild(this.box);
                }
            }, 200);
        }
        destroy() {
            this.close();
            delete window.libvil;
            delete set_title;
            delete createFolder;
            delete scriptName;
            this.addLog('Library destroyed');
        }
    }
    const gui = new libvil();
    window.libvil = gui;
    set_title = (title) => gui.set(title);
    createFolder = new Proxy({}, {
        get: (_, prop) => (name, parentId = null) => gui.createFolder(prop, name, parentId)
    });
    scriptName = new Proxy({}, {
        get: (_, prop) => {
            if (prop === 'infolder') {
                return new Proxy({}, {
                    get: (_, folderId) => (name, script) => gui.createFolderScript(folderId, name, script)
                });
            }
            return (name, script) => gui.btn(name, script);
        }
    });
    console.log('🚀 libvil loaded successfully!');
})();

set_title('Test');
createFolder.opt1('Crypto');
scriptName.infolder.opt1('Test', `
console.log("hi");
`);