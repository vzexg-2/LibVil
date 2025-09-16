(function () {
    'use strict';

    if (window.libvil) {
        console.warn('libvil already loaded!');
        return;
    }

    class libvil {
        constructor() {
            this.container = null;
            this.content = null;
            this.folders = {};
            this.scripts = {};
            this.folderScripts = {};
            this.currentFolder = null;
            this.title = 'libvil';
            this.searchInput = null;
            this.logs = [];
            this.logContainer = null;
            this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            this.isMinimized = false;
            this.init();
        }

        init() {
            this.container = document.createElement('div');
            this.container.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: ${this.isMobile ? '270px' : '300px'};
                max-width: 90vw;
                height: ${this.isMobile ? '350px' : '380px'};
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

            const titleBar = document.createElement('div');
            titleBar.style.cssText = `
                background: linear-gradient(90deg, #2a2a2a, #222);
                padding: ${this.isMobile ? '6px 10px' : '8px 12px'};
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: move;
            `;

            const titleElement = document.createElement('div');
            titleElement.style.cssText = `
                color: #d0d0d0;
                font-size: ${this.isMobile ? '12px' : '13px'};
                font-weight: 600;
                flex: 1;
                text-align: center;
                text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
            `;
            titleElement.textContent = this.title;

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

            const minimizeBtn = document.createElement('button');
            minimizeBtn.textContent = '-';
            minimizeBtn.style.cssText = `
                background: none;
                border: none;
                color: #d0d0d0;
                font-size: ${this.isMobile ? '14px' : '16px'};
                cursor: pointer;
                padding: 4px 8px;
            `;
            minimizeBtn.onclick = () => this.toggleMinimize();
            minimizeBtn.onmouseenter = () => (minimizeBtn.style.color = '#ffffff');
            minimizeBtn.onmouseleave = () => (minimizeBtn.style.color = '#d0d0d0');

            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.style.cssText = `
                background: none;
                border: none;
                color: #d0d0d0;
                font-size: ${this.isMobile ? '14px' : '16px'};
                cursor: pointer;
                padding: 4px 8px;
            `;
            closeBtn.onclick = () => this.close();
            closeBtn.onmouseenter = () => (closeBtn.style.color = '#ffffff');
            closeBtn.onmouseleave = () => (closeBtn.style.color = '#d0d0d0');

            titleBar.appendChild(minimizeBtn);
            titleBar.appendChild(titleElement);
            titleBar.appendChild(closeBtn);

            const searchDiv = document.createElement('div');
            searchDiv.className = 'libvil-search';
            searchDiv.style.cssText = `
                padding: ${this.isMobile ? '6px' : '8px'};
                background: #1a1a1a;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            `;

            this.searchInput = document.createElement('input');
            this.searchInput.type = 'text';
            this.searchInput.placeholder = 'Search...';
            this.searchInput.style.cssText = `
                width: 100%;
                padding: ${this.isMobile ? '5px 6px' : '6px 8px'};
                background: #2a2a2a;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                color: #d0d0d0;
                font-size: ${this.isMobile ? '11px' : '12px'};
                box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
            `;
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => this.search(e.target.value), 150);
            });

            searchDiv.appendChild(this.searchInput);

            this.content = document.createElement('div');
            this.content.className = 'libvil-scrollbar';
            this.content.style.cssText = `
                padding: ${this.isMobile ? '8px' : '10px'};
                height: calc(100% - ${this.isMobile ? '90px' : '100px'});
                overflow-y: auto;
                background: #1a1a1a;
            `;

            this.logContainer = document.createElement('div');
            this.logContainer.style.cssText = `
                padding: ${this.isMobile ? '6px' : '8px'};
                background: #2a2a2a;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                color: #d0d0d0;
                font-size: ${this.isMobile ? '10px' : '11px'};
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `;

            this.container.appendChild(titleBar);
            this.container.appendChild(searchDiv);
            this.container.appendChild(this.content);
            this.container.appendChild(this.logContainer);
            document.body.appendChild(this.container);

            this.titleElement = titleElement;
            this.searchDiv = searchDiv;
            this.minimizeBtn = minimizeBtn;

            let isDragging = false;
            let initialX, initialY;
            let rafId = null;

            const startDrag = (x, y, isTouch = false) => {
                isDragging = true;
                const rect = this.container.getBoundingClientRect();
                initialX = x - rect.left;
                initialY = y - rect.top;
                if (!isTouch) {
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                }
            };

            const updatePosition = (x, y) => {
                const maxX = window.innerWidth - this.container.offsetWidth;
                const maxY = window.innerHeight - this.container.offsetHeight;
                const newX = Math.max(0, Math.min(x - initialX, maxX));
                const newY = Math.max(0, Math.min(y - initialY, maxY));
                this.container.style.left = `${newX}px`;
                this.container.style.top = `${newY}px`;
                this.container.style.transform = 'none';
            };

            const onMouseMove = (e) => {
                if (!isDragging) return;
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => updatePosition(e.clientX, e.clientY));
            };

            const onTouchMove = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const touch = e.touches[0];
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => updatePosition(touch.clientX, touch.clientY));
            };

            const onMouseUp = () => {
                isDragging = false;
                cancelAnimationFrame(rafId);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            const onTouchEnd = () => {
                isDragging = false;
                cancelAnimationFrame(rafId);
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            };

            titleBar.addEventListener('mousedown', (e) => {
                if (e.target === closeBtn || e.target === minimizeBtn) return;
                startDrag(e.clientX, e.clientY);
            });

            titleBar.addEventListener('touchstart', (e) => {
                if (e.target === closeBtn || e.target === minimizeBtn) return;
                const touch = e.touches[0];
                startDrag(touch.clientX, touch.clientY, true);
                document.addEventListener('touchmove', onTouchMove, { passive: false });
                document.addEventListener('touchend', onTouchEnd);
            });

            this.container.style.opacity = '0';
            requestAnimationFrame(() => {
                this.container.style.opacity = '1';
                this.container.style.transform = 'translate(-50%, -50%)';
            });
        }

        toggleMinimize() {
            this.isMinimized = !this.isMinimized;
            if (this.isMinimized) {
                this.container.style.height = this.isMobile ? '32px' : '36px';
                this.searchDiv.style.display = 'none';
                this.content.style.display = 'none';
                this.logContainer.style.display = 'none';
                this.minimizeBtn.textContent = '+';
            } else {
                this.container.style.height = this.isMobile ? '350px' : '380px';
                this.searchDiv.style.display = '';
                this.content.style.display = '';
                this.logContainer.style.display = '';
                this.minimizeBtn.textContent = '-';
                this.currentFolder ? this.openFolder(this.currentFolder, this.folders[this.currentFolder].name) : this.showMain();
            }
            this.addLog(this.isMinimized ? 'Minimized' : 'Restored');
        }

        setTitle(title) {
            if (typeof title !== 'string') {
                this.addLog('Error: Invalid title');
                return;
            }
            this.title = title;
            this.titleElement.textContent = title;
        }

        createFolder(id, name, parentId = null) {
            if (this.folders[id]) {
                this.addLog(`Error: Folder ${id} already exists`);
                return;
            }

            const folder = document.createElement('div');
            folder.classList.add('libvil-folder', 'libvil-animate');
            folder.style.cssText = `
                background: linear-gradient(145deg, #222, #1a1a1a);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                padding: ${this.isMobile ? '8px' : '10px'};
                margin-bottom: 6px;
                color: #d0d0d0;
                font-size: ${this.isMobile ? '12px' : '13px'};
                cursor: pointer;
                box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
            `;
            folder.textContent = `📁 ${name}`;
            folder.title = name;
            folder.onclick = () => this.openFolder(id, name);

            if (parentId && !this.folders[parentId]) {
                this.addLog(`Error: Parent folder ${parentId} does not exist`);
                return;
            }

            if (parentId) {
                this.folders[parentId].scripts.push(id);
                this.folderScripts[parentId][id] = { type: 'folder', name };
            } else {
                this.content.appendChild(folder);
            }

            this.folders[id] = { element: folder, name, scripts: [], parent: parentId };
            this.folderScripts[id] = {};
            this.addLog(`Created folder: ${name}`);
        }

        createButton(name, script, folderId = null) {
            const button = document.createElement('button');
            button.classList.add('libvil-button', 'libvil-animate');
            button.style.cssText = `
                background: linear-gradient(145deg, #222, #1a1a1a);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                padding: ${this.isMobile ? '8px' : '10px'};
                margin-bottom: 6px;
                width: 100%;
                color: #d0d0d0;
                font-size: ${this.isMobile ? '12px' : '13px'};
                text-align: left;
                cursor: pointer;
                box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
            `;
            button.textContent = name;
            button.title = name;
            button.onclick = () => this.executeScript(script, button);

            if (folderId) {
                this.folderScripts[folderId][name] = script;
            } else {
                this.content.appendChild(button);
                this.scripts[name] = script;
            }
        }

        createFolderScript(folderId, name, script) {
            if (!this.folders[folderId]) {
                this.addLog(`Error: Folder ${folderId} does not exist`);
                return;
            }
            this.createButton(name, script, folderId);
            this.addLog(`Created script: ${name} in folder ${folderId}`);
        }

        openFolder(folderId, folderName) {
            if (!this.folders[folderId]) {
                this.addLog(`Error: Folder ${folderId} not found`);
                return;
            }

            this.currentFolder = folderId;
            this.content.innerHTML = '';
            this.content.style.opacity = '0';

            const fragment = document.createDocumentFragment();
            const backBtn = document.createElement('button');
            backBtn.classList.add('libvil-back', 'libvil-animate');
            backBtn.style.cssText = `
                background: linear-gradient(145deg, #222, #1a1a1a);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                padding: ${this.isMobile ? '6px 10px' : '8px 12px'};
                margin-bottom: 10px;
                color: #d0d0d0;
                font-size: ${this.isMobile ? '12px' : '13px'};
                cursor: pointer;
                box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
            `;
            backBtn.textContent = '← Back';
            backBtn.onclick = () => this.showMain();
            fragment.appendChild(backBtn);

            const folderTitle = document.createElement('div');
            folderTitle.style.cssText = `
                color: #d0d0d0;
                font-size: ${this.isMobile ? '13px' : '14px'};
                font-weight: 600;
                margin-bottom: 10px;
                text-align: center;
                text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
            `;
            folderTitle.textContent = `📁 ${folderName}`;
            fragment.appendChild(folderTitle);

            const items = this.folderScripts[folderId];
            for (const [key, value] of Object.entries(items)) {
                if (value.type === 'folder') {
                    const subFolder = this.folders[key].element.cloneNode(true);
                    subFolder.onclick = () => this.openFolder(key, value.name);
                    fragment.appendChild(subFolder);
                } else {
                    const button = document.createElement('button');
                    button.classList.add('libvil-button', 'libvil-animate');
                    button.style.cssText = `
                        background: linear-gradient(145deg, #222, #1a1a1a);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 4px;
                        padding: ${this.isMobile ? '8px' : '10px'};
                        margin-bottom: 6px;
                        width: 100%;
                        color: #d0d0d0;
                        font-size: ${this.isMobile ? '12px' : '13px'};
                        text-align: left;
                        cursor: pointer;
                        box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
                    `;
                    button.textContent = key;
                    button.title = key;
                    button.onclick = () => this.executeScript(value, button);
                    fragment.appendChild(button);
                }
            }

            this.content.appendChild(fragment);
            requestAnimationFrame(() => {
                this.content.style.opacity = '1';
            });
            this.addLog(`Opened folder: ${folderName}`);
        }

        showMain() {
            this.currentFolder = null;
            this.content.innerHTML = '';
            this.content.style.opacity = '0';

            const fragment = document.createDocumentFragment();
            for (const folder of Object.values(this.folders).filter((f) => !f.parent)) {
                fragment.appendChild(folder.element);
            }

            for (const [name, script] of Object.entries(this.scripts)) {
                const button = document.createElement('button');
                button.classList.add('libvil-button', 'libvil-animate');
                button.style.cssText = `
                    background: linear-gradient(145deg, #222, #1a1a1a);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    padding: ${this.isMobile ? '8px' : '10px'};
                    margin-bottom: 6px;
                    width: 100%;
                    color: #d0d0d0;
                    font-size: ${this.isMobile ? '12px' : '13px'};
                    text-align: left;
                    cursor: pointer;
                    box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
                `;
                button.textContent = name;
                button.title = name;
                button.onclick = () => this.executeScript(script, button);
                fragment.appendChild(button);
            }

            this.content.appendChild(fragment);
            requestAnimationFrame(() => {
                this.content.style.opacity = '1';
            });
            this.addLog('Returned to main view');
        }

        executeScript(script, button) {
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

        addLog(message) {
            this.logs.push(`${new Date().toLocaleTimeString()}: ${message}`);
            if (this.logs.length > 3) this.logs.shift();
            this.logContainer.textContent = this.logs.join(' | ');
        }

        search(term) {
            const children = Array.from(this.content.children);
            const isFolderOpen = !!this.currentFolder;
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
            this.container.style.opacity = '0';
            setTimeout(() => {
                if (this.container && this.container.parentNode) {
                    this.container.parentNode.removeChild(this.container);
                }
            }, 200);
        }

        destroy() {
            this.close();
            delete window.libvil;
            delete window.set_title;
            delete window.createFolder;
            delete window.scriptName;
            this.addLog('Library destroyed');
        }
    }

    const gui = new libvil();
    window.libvil = gui;

    window.set_title = (title) => gui.setTitle(title);

    window.createFolder = new Proxy({}, {
        get: (_, prop) => (name, parentId = null) => gui.createFolder(prop, name, parentId),
    });

    window.scriptName = new Proxy({}, {
        get: (_, prop) => {
            if (prop === 'infolder') {
                return new Proxy({}, {
                    get: (_, folderId) => (name, script) => gui.createFolderScript(folderId, name, script),
                });
            }
            return (name, script) => gui.createButton(name, script);
        },
    });

    console.log('🚀 libvil loaded successfully!');
})();