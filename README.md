# O fotografo 📸

**Editor de fotografias automático via webhook n8n**

Página web moderna para upload de fotografias, processamento automático através de workflow n8n e download da imagem editada.

[![Deploy](https://img.shields.io/badge/deploy-live-brightgreen.svg)](https://photo-editor-n8n-mim1qdk3m-carlos-projects-e332b665.vercel.app)
![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌐 Aplicação Live

**🔗 Aceder agora:** [https://photo-editor-n8n-mim1qdk3m-carlos-projects-e332b665.vercel.app](https://photo-editor-n8n-mim1qdk3m-carlos-projects-e332b665.vercel.app)

## 🌟 Funcionalidades

- ✅ **Upload Intuitivo**: Drag & drop ou seleção de ficheiro
- ✅ **Validação Automática**: Máximo 10MB, formatos JPG/PNG/WEBP
- ✅ **Preview Instantâneo**: Visualização da imagem antes do envio
- ✅ **Processamento Automático**: Integração com workflow n8n
- ✅ **Comparação Visual**: Lado-a-lado original vs editada
- ✅ **Download Rápido**: Guardar imagem editada no computador
- ✅ **Design Moderno**: Tema escuro e interface clean
- ✅ **Totalmente Responsivo**: Funciona em desktop, tablet e mobile

## 🚀 Como Usar

1. **Aceder à página**: [https://photo-editor-n8n-mim1qdk3m-carlos-projects-e332b665.vercel.app](https://photo-editor-n8n-mim1qdk3m-carlos-projects-e332b665.vercel.app)
2. **Fazer upload**: Arrastar foto ou clicar para selecionar
3. **Enviar**: Clicar no botão "Enviar para Edição"
4. **Aguardar**: O workflow n8n processa a imagem
5. **Comparar**: Ver original vs editada lado-a-lado
6. **Download**: Guardar a imagem editada

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Webhook n8n
- **Hosting**: Vercel
- **Deployment**: Auto-deploy via GitHub

## 🔧 Configuração do Webhook n8n

### ⚠️ IMPORTANTE: Configuração CORS

O webhook **DEVE** estar configurado para aceitar requests do domínio Vercel.

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

### Passo 2: Configuração do n8n Server

Se estiveres a usar n8n self-hosted, adiciona ao ficheiro `.env`:

```bash
# Permitir CORS
N8N_CORS_ORIGIN=https://photo-editor-n8n-mim1qdk3m-carlos-projects-e332b665.vercel.app
```

Ou para permitir qualquer origem (apenas desenvolvimento):
```bash
N8N_CORS_ORIGIN=*
```

### Passo 3: Estrutura do Workflow n8n

**Exemplo de workflow básico:**

```
1. Webhook (Trigger)
   ↓
2. Code Node (processar imagem)
   ↓
3. Respond to Webhook (retornar resultado)
```

**Webhook recebe:**
- FormData: `file`, `filename`, `mimeType`

**Deve retornar JSON:**
```json
{
  "success": true,
  "editedImage": "data:image/jpeg;base64,..." ou "https://url-da-imagem"
}
```

### Passo 4: Testar o Webhook

**Teste 1: Via cURL**
```bash
curl -X POST https://olancador.pt/webhook/fotografo \
  -F "file=@test.jpg" \
  -F "filename=test.jpg" \
  -F "mimeType=image/jpeg"
```

**Teste 2: Via Postman**
1. Método: POST
2. URL: https://olancador.pt/webhook/fotografo
3. Body: form-data
4. Adicionar: file (File), filename (Text), mimeType (Text)

## 🐛 Resolução de Problemas

### "Erro de conexão" - CORS

**Problema:** O browser bloqueia o request por CORS.

**Solução:**
1. Verificar se n8n tem CORS configurado (ver acima)
2. Adicionar response headers no Webhook Node
3. Configurar `N8N_CORS_ORIGIN` no servidor n8n

**Debug no Console (F12):**
```
❌ Failed to fetch
Access to fetch at 'https://olancador.pt/webhook/fotografo' 
from origin 'https://photo-editor-n8n-...' has been blocked by CORS
```

### Webhook não recebe dados

**Verificar:**
1. ✅ Webhook está ativo no n8n?
2. ✅ URL está correta: `https://olancador.pt/webhook/fotografo`
3. ✅ Workflow está em execução (não em teste)?
4. ✅ n8n tem acesso público à internet?

**Debug:**
- Verificar executions no n8n
- Ver logs do servidor n8n
- Testar webhook com cURL/Postman primeiro

### "Ficheiro muito grande"

**Solução:**
- Comprimir imagem antes do upload
- Máximo: 10MB
- Ajustar limite se necessário no código

### "Formato não suportado"

**Solução:**
- Usar apenas: JPG, PNG ou WEBP
- Converter imagem se necessário

## 📋 Estrutura do Projeto

```
photo-editor-n8n/
├── index.html          # Página completa (HTML + CSS + JS)
├── README.md          # Esta documentação
└── CHANGELOG.md       # Histórico de alterações
```

## 📝 Desenvolvimento

### Formato de Envio

Por defeito usa **FormData**:
```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('filename', file.name);
formData.append('mimeType', file.type);
```

Para usar **JSON/base64** (alternativo), alterar em `index.html`:
```javascript
CONFIG = {
    ...
    useFormData: false  // Mudar para false
}
```

### Validações Implementadas

- **Tamanho**: Máximo 10MB
- **Formatos**: JPEG, PNG, WEBP
- **Tipo real**: Verificação de magic numbers
- **MIME type**: Validação dupla

### Estados da Interface

1. **Upload**: Estado inicial com drag & drop
2. **Preview**: Pré-visualização antes do envio
3. **Loading**: Durante processamento n8n
4. **Result**: Comparação das imagens
5. **Error**: Tratamento de erros

## 📱 Compatibilidade

- ✅ Chrome/Edge (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Mobile Chrome/Safari

## 🔒 Segurança

- Validação de tipos MIME reais (não apenas extensões)
- Limitação de tamanho de ficheiro (10MB)
- Sanitização de nomes de ficheiro
- Timeout de requests (60 segundos)

## 🚀 Deploy

### Vercel

✅ **Deploy ativo e configurado!**

O projeto está automaticamente ligado ao GitHub:
- Cada commit no `main` dispara novo deploy
- URL de produção atualizada automaticamente
- Build e deploy em segundos

### GitHub Pages (alternativo)

```bash
# Apenas fazer commit do index.html
git add index.html
git commit -m "update"
git push
```

## 🔗 Links Úteis

- **Aplicação**: https://photo-editor-n8n-mim1qdk3m-carlos-projects-e332b665.vercel.app
- **Repositório**: https://github.com/charliethebanker/photo-editor-n8n
- **n8n Docs**: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/
- **CORS Guide**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

## 📄 Licença

MIT License - uso livre para projetos pessoais e comerciais.

## 👨‍💻 Autor

**charliethebanker**
- GitHub: [@charliethebanker](https://github.com/charliethebanker)

## 🙏 Agradecimentos

- Design inspirado em interfaces modernas de IA
- Workflow n8n para processamento de imagens
- Comunidade open-source

---

## 🆘 Suporte

**Problemas comuns resolvidos:**
- ✅ CORS configurado
- ✅ FormData implementado
- ✅ Logs de debug detalhados
- ✅ Mensagens de erro claras

**Precisas de ajuda?**
1. Verificar logs do console (F12)
2. Testar webhook com cURL/Postman
3. Verificar executions no n8n
4. Abrir issue no GitHub

---

**Desenvolvido com ❤️ usando Claude Code**