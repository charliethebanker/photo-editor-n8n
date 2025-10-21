# O fotografo 📸

**Editor de fotografias automático via webhook n8n**

Aplicação moderna construída com Next.js, React e TypeScript para upload de fotografias, processamento automático através de workflow n8n e download da imagem editada com formatos otimizados para redes sociais.

[![Deploy](https://img.shields.io/badge/deploy-live-brightgreen.svg)](https://charliethebanker.github.io/photo-editor-n8n/)
![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌐 Aplicação Live

**🔗 Aceder agora:** [https://charliethebanker.github.io/photo-editor-n8n/](https://charliethebanker.github.io/photo-editor-n8n/)

## 🌟 Funcionalidades

- ✅ **Upload Intuitivo**: Drag & drop ou seleção de ficheiro
- ✅ **Validação Automática**: Máximo 10MB, formatos JPG/PNG/WEBP
- ✅ **Preview Instantâneo**: Visualização da imagem antes do envio
- ✅ **Processamento Automático**: Integração com workflow n8n
- ✅ **Comparação Interativa**: Slider antes/depois para comparar imagens
- ✅ **Formatos para Redes Sociais**: Download otimizado para Instagram Post, Instagram Story, TikTok, Twitter
- ✅ **Animações Suaves**: Transições elegantes com Framer Motion
- ✅ **Design Moderno**: Glass morphism com tema fotografia consistente
- ✅ **Totalmente Responsivo**: Funciona em desktop, tablet e mobile

## 🚀 Como Usar

1. **Aceder à página**: [https://charliethebanker.github.io/photo-editor-n8n/](https://charliethebanker.github.io/photo-editor-n8n/)
2. **Fazer upload**: Arrastar foto ou clicar para selecionar (máx 10MB)
3. **Preview**: Visualizar imagem e confirmar envio
4. **Processar**: Clicar em "Processar Imagem"
5. **Aguardar**: O workflow n8n processa a imagem (até 120s)
6. **Comparar**: Ver original vs editada com slider interativo
7. **Escolher formato**: Selecionar formato desejado (Original, Instagram, TikTok, etc.)
8. **Download**: Guardar a imagem editada no formato escolhido

## 🛠️ Tecnologias

- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca UI
- **TypeScript 5**: Type safety
- **Tailwind CSS 3.4**: Estilização moderna
- **Framer Motion 10**: Animações suaves
- **GSAP 3.12**: Animações avançadas
- **Backend**: Webhook n8n
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📋 Instalação Local

### Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn
- Webhook n8n configurado

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/charliethebanker/photo-editor-n8n.git
cd photo-editor-n8n
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o webhook (opcional):
```bash
cp .env.example .env.local
```

Edite `.env.local` se quiser usar URL diferente:
```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://seu-webhook.com/webhook/fotografo
```

4. Execute em desenvolvimento:
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

5. Build para produção:
```bash
npm run build
```

## 🔧 Configuração do Webhook n8n

### ⚠️ IMPORTANTE: Configuração CORS

O webhook **DEVE** estar configurado para aceitar requests do domínio GitHub Pages.

### Passo 1: Configurar o Webhook Node no n8n

1. **Adicionar Webhook Node** ao workflow
2. **Configurações do Webhook:**
   ```
   HTTP Method: POST
   Path: /webhook/fotografo
   Authentication: None (ou conforme necessário)
   Response Mode: Last Node
   Response Code: 200
   ```

3. **Response Headers (CRUCIAL!):**
   ```json
   {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "POST, OPTIONS",
     "Access-Control-Allow-Headers": "Content-Type"
   }
   ```

### Passo 2: Formato de Dados

**A aplicação envia:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Fields:
  - `file`: O arquivo da imagem
  - `filename`: Nome do arquivo
  - `mimeType`: Tipo MIME (ex: image/jpeg)

**O webhook deve retornar:**
- Content-Type: `application/json` ou `text/plain`
- Body:
  ```json
  {
    "editedImage": "data:image/jpeg;base64,..." ou "https://url-da-imagem.jpg",
    "image": "alternativa ao editedImage (fallback)"
  }
  ```

### Passo 3: Configuração do n8n Server

Se estiveres a usar n8n self-hosted, adiciona ao ficheiro `.env`:

```bash
# Permitir CORS
N8N_CORS_ORIGIN=https://charliethebanker.github.io
```

Ou para permitir qualquer origem (apenas desenvolvimento):
```bash
N8N_CORS_ORIGIN=*
```

### Passo 4: Estrutura do Workflow n8n

**Exemplo de workflow básico:**

```
1. Webhook (Trigger)
   ↓
2. Code Node (processar imagem)
   ↓
3. Respond to Webhook (retornar resultado)
```

### Passo 5: Testar o Webhook

**Via cURL:**
```bash
curl -X POST https://olancador.pt/webhook/fotografo \
  -F "file=@test.jpg" \
  -F "filename=test.jpg" \
  -F "mimeType=image/jpeg"
```

**Via Postman:**
1. Método: POST
2. URL: https://olancador.pt/webhook/fotografo
3. Body: form-data
4. Adicionar: file (File), filename (Text), mimeType (Text)

## 🐛 Resolução de Problemas

### "Erro de conexão" - CORS

**Problema:** O browser bloqueia o request por CORS.

**Solução:**
1. Verificar se n8n tem CORS configurado
2. Adicionar response headers no Webhook Node
3. Configurar `N8N_CORS_ORIGIN` no servidor n8n

**Mensagem no Console (F12):**
```
❌ Erro de conexão. Verifique:
• Webhook está ativo?
• CORS configurado?
• Internet funcional?
```

### "Tempo limite excedido"

**Problema:** Processamento leva mais de 120 segundos.

**Solução:**
- Reduzir tamanho da imagem
- Otimizar processamento no n8n
- Verificar se n8n não está sobrecarregado

### Webhook não recebe dados

**Verificar:**
1. ✅ Webhook está ativo no n8n?
2. ✅ URL está correta: `https://olancador.pt/webhook/fotografo`
3. ✅ Workflow está em produção (não apenas teste)?
4. ✅ n8n tem acesso público à internet?

**Debug:**
- Verificar executions no n8n
- Ver logs do servidor n8n (F12 no navegador)
- Testar webhook com cURL/Postman primeiro

## 📁 Estrutura do Projeto

```
photo-editor-n8n/
├── app/
│   ├── globals.css          # Estilos globais Tailwind
│   ├── layout.tsx            # Layout raiz com metadata
│   └── page.tsx              # Página principal com lógica
├── components/
│   ├── icons/                # 8 ícones SVG customizados
│   │   ├── ApertureIcon.tsx  # Ícone diafragma
│   │   ├── FrameIcon.tsx     # Ícone moldura Polaroid
│   │   ├── CameraIcon.tsx    # Ícone câmera
│   │   ├── CancelIcon.tsx    # Ícone cancelar
│   │   ├── SendIcon.tsx      # Ícone enviar
│   │   ├── DownloadIcon.tsx  # Ícone download
│   │   ├── GalleryIcon.tsx   # Ícone galeria
│   │   └── RetryIcon.tsx     # Ícone retry
│   ├── sections/             # 5 seções principais
│   │   ├── UploadSection.tsx     # Upload com drag & drop
│   │   ├── PreviewSection.tsx    # Preview da imagem
│   │   ├── LoadingSection.tsx    # Spinner animado
│   │   ├── ResultSection.tsx     # Comparação e download
│   │   └── ErrorSection.tsx      # Tratamento de erros
│   ├── ui/
│   │   └── GlassButton.tsx       # Botão com glass morphism
│   └── BackgroundGradient.tsx    # Background SVG animado
├── public/
│   └── .nojekyll             # Para GitHub Pages
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD automático
├── .env.example              # Exemplo de configuração
├── .gitignore                # Arquivos ignorados
├── next.config.js            # Config Next.js (static export)
├── tailwind.config.ts        # Config Tailwind (cores custom)
├── tsconfig.json             # Config TypeScript
├── package.json              # Dependências
└── README.md                 # Esta documentação
```

## 🎨 Design

O design utiliza:
- **Glass Morphism**: Efeitos de vidro translúcido com backdrop-filter
- **Tema Fotografia Consistente**: 10 ícones SVG customizados (aperture, câmera, frame, etc.)
- **Gradientes Animados**: Background com 3 camadas SVG animadas
- **Animações Suaves**: Framer Motion para transições entre estados
- **Ripple Effect**: Efeito de ondas nos botões ao clicar
- **Slider Interativo**: Comparação antes/depois com controle deslizante
- **Responsivo**: Grid adaptativo para desktop e mobile

### Paleta de Cores

```typescript
colors: {
  background: '#0a0a0a',
  primary: { DEFAULT: '#6366f1', hover: '#4f46e5', light: '#818cf8' },
  accent: { DEFAULT: '#10b981', orange: '#f59e0b', purple: '#8b5cf6' }
}
```

## 🔒 Segurança

- ✅ Validação de tipos MIME reais (magic numbers)
- ✅ Limitação de tamanho (10MB)
- ✅ Timeout de requests (120 segundos)
- ✅ Sanitização via FormData
- ✅ CORS configurado
- ✅ Sem armazenamento de imagens no frontend

## 📱 Compatibilidade

- ✅ Chrome/Edge (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Mobile Chrome/Safari
- ✅ Progressive Web App ready

## 🚀 Deploy Automático

O projeto usa GitHub Actions para deploy automático:

1. Push para branch `claude/improve-page-elements-011CUKCv4hnPQcjJaAUq5xMB`
2. GitHub Actions executa:
   - Instala Node.js 20
   - Instala dependências
   - Build do Next.js
   - Deploy para `gh-pages` branch
3. GitHub Pages serve a aplicação
4. Aplicação atualizada em 2-3 minutos

**URL de produção:** https://charliethebanker.github.io/photo-editor-n8n/

## 🔗 Links Úteis

- **Aplicação Live**: https://charliethebanker.github.io/photo-editor-n8n/
- **Repositório**: https://github.com/charliethebanker/photo-editor-n8n
- **n8n Docs**: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/
- **Next.js Docs**: https://nextjs.org/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/

## 📄 Licença

MIT License - uso livre para projetos pessoais e comerciais.

## 👨‍💻 Autor

**charliethebanker**
- GitHub: [@charliethebanker](https://github.com/charliethebanker)

## 🙏 Agradecimentos

- Design inspirado em interfaces modernas de edição de fotos
- Workflow n8n para processamento de imagens
- Comunidade Next.js e React
- Claude Code para desenvolvimento assistido por IA

---

## 🆘 Suporte

**Logs de Debug:**

A aplicação inclui logs detalhados no console (F12):
- 📤 Envio para webhook
- 📁 Tamanho do arquivo
- 📡 Status da resposta
- 📄 Content-Type
- ✅ Sucesso ou ❌ Erro detalhado

**Precisas de ajuda?**
1. Abrir console (F12) e verificar logs
2. Testar webhook com cURL/Postman
3. Verificar executions no n8n
4. Verificar CORS está configurado
5. Abrir issue no GitHub

---

**Desenvolvido com ❤️ usando Claude Code**
