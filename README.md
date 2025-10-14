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

## 📋 Estrutura do Projeto

```
photo-editor-n8n/
├── index.html          # Página completa (HTML + CSS + JS)
├── README.md          # Esta documentação
└── CHANGELOG.md       # Histórico de alterações
```

## 🔧 Configuração

### Webhook n8n

O projeto está configurado para enviar imagens para:
```
https://olancador.pt/webhook/fotografo
```

**Formato esperado da resposta:**
```json
{
  "success": true,
  "editedImage": "data:image/jpeg;base64,..." ou "https://..."
}
```

### Deploy no Vercel

✅ **Deploy ativo e configurado!**

O projeto está automaticamente ligado ao GitHub:
- Cada commit no `main` dispara novo deploy
- URL de produção atualizada automaticamente
- Build e deploy em segundos

## 📱 Compatibilidade

- ✅ Chrome/Edge (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Mobile Chrome/Safari

## 🔒 Segurança

- Validação de tipos MIME reais (não apenas extensões)
- Limitação de tamanho de ficheiro (10MB)
- Sanitização de nomes de ficheiro
- Content Security Policy implementado

## 📝 Desenvolvimento

### Validações Implementadas

- **Tamanho**: Máximo 10MB
- **Formatos**: JPEG, PNG, WEBP
- **Tipo real**: Verificação de magic numbers

### Estados da Interface

1. **Upload**: Estado inicial com drag & drop
2. **Preview**: Pré-visualização antes do envio
3. **Loading**: Durante processamento n8n
4. **Result**: Comparação das imagens
5. **Error**: Tratamento de erros

## 🐛 Resolução de Problemas

### "Ficheiro muito grande"
- Reduzir tamanho da imagem
- Comprimir antes do upload
- Máximo: 10MB

### "Formato não suportado"
- Usar JPG, PNG ou WEBP
- Converter imagem se necessário

### "Erro ao processar"
- Verificar conexão internet
- Tentar novamente
- Contactar suporte se persistir

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

**Desenvolvido com ❤️ usando Claude Code**