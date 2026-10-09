const fs = require('fs');
const path = require('path');

function processFile(filePath, isPage) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Prefix with use client
    if (!content.includes('"use client"')) {
        content = '"use client";\n' + content;
    }
    // Replace react-router-dom
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]react-router-dom['"]/g, (match, imports) => {
        let newImports = '';
        if (imports.includes('Link')) {
            newImports += "import Link from 'next/link';\n";
        }
        if (imports.includes('useNavigate')) {
            newImports += "import { useRouter } from 'next/navigation';\n";
        }
        return newImports;
    });
    // Replace useNavigate with useRouter
    content = content.replace(/useNavigate\(\)/g, 'useRouter()');
    
    // Replace react imports if necessary
    return content;
}

const backupPagesDir = path.join('_backup_vite', 'src', 'pages');
const backupComponentsDir = path.join('_backup_vite', 'src', 'components');

const appDir = path.join('src', 'app');
const componentsDir = path.join('src', 'components');
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

// Move components
if (fs.existsSync(backupComponentsDir)) {
    const components = fs.readdirSync(backupComponentsDir);
    for (const comp of components) {
        if (comp.endsWith('.jsx') || comp.endsWith('.js')) {
            const content = processFile(path.join(backupComponentsDir, comp), false);
            fs.writeFileSync(path.join(componentsDir, comp), content);
        }
    }
}

// Move pages
const routesMap = {
    'Home.jsx': '',
    'Dashboard.jsx': 'dashboard',
    'ProjetoTemp.jsx': 'projeto',
    'Capitulos.jsx': 'capitulos',
    'Modulo1.jsx': 'modulo1',
    'Admin.jsx': 'admin'
};

if (fs.existsSync(backupPagesDir)) {
    const pages = fs.readdirSync(backupPagesDir);
    for (const page of pages) {
        if (routesMap[page] !== undefined) {
            const routePath = routesMap[page];
            const pageDir = path.join(appDir, routePath);
            if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
            
            let content = processFile(path.join(backupPagesDir, page), true);
            fs.writeFileSync(path.join(pageDir, 'page.jsx'), content);
        }
    }
}
console.log('Migration script completed.');
