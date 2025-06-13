# 🛒 AivaTech E-commerce

> Uma aplicação construída com React, TypeScript e Vite

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.10-06B6D4?style=for-the-badge&logo=tailwindcss)

## 🌟 Funcionalidades

- 🏠 **Página inicial** com produtos em destaque
- 🔍 **Busca e filtros** avançados por nome e preço
- 🛍️ **Carrinho de compras** com persistência local
- 📝 **Publicação de produtos** com upload de imagens
- 👤 **Autenticação** de usuários
- 🌐 **Internacionalização** (Português/Inglês)
- 📱 **Design responsivo** para todos os dispositivos
- ⚡ **Performance otimizada** com lazy loading
- 🧪 **Testes automatizados** (unitários e E2E)

## 🚀 Deploy

### 🌐 **Produção**
- **Live Demo**: [https://aiva-tech-test-jd.netlify.app/](https://aiva-tech-test-jd.netlify.app/)
## 🛠️ Setup do Projeto

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**

```bash
# Clone o repositório
git clone git@github.com:jdaniel-ap/store-app-test.git
cd store-app-test

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

### **Configuração do .env**

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
# API Base URL - Endpoint da API de produtos
VITE_API_BASE_URL=https://api.escuelajs.co/api/v1
```

## 📝 Scripts Disponíveis

### **Desenvolvimento**
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
```

### **Qualidade de Código**
```bash
npm run lint         # Verificar ESLint
npm run lint:fix     # Corrigir ESLint automaticamente
npm run format       # Formatar código com Prettier
npm run format:check # Verificar formatação
```

### **Testes**
```bash
npm run test         # Testes unitários (modo watch)
npm run test:run     # Testes unitários (uma vez)
npm run test:ui      # Interface visual dos testes
npm run test:coverage # Cobertura de testes
```

### **Cypress E2E**
```bash
npm run cypress:open  # Testes e2e
```

## 🏗️ Arquitetura

### **Estrutura de Pastas**

```
src/
├── components/           # Componentes organizados por Atomic Design
│   ├── atoms/           # Componentes básicos (Button, Input, etc.)
│   ├── molecules/       # Combinações de átomos (ProductCard, etc.)
│   ├── organisms/       # Seções complexas (Header, ProductList, etc.)
│   ├── templates/       # Layouts de página
│   ├── pages/          # Páginas da aplicação
│   └── ui/             # Componentes base do shadcn/ui
├── hooks/              # Custom hooks React
├── services/           # APIs e serviços externos
├── stores/             # Estado global (Zustand)
├── lib/                # Utilitários e configurações
├── locales/            # Arquivos de tradução (i18n)
└── assets/             # Imagens, ícones, etc.
```

### **Padrões Arquiteturais**

#### **🏛️ Atomic Design**
Componentes organizados seguindo o padrão Atomic Design para máxima reutilização:

```
components/
├── atoms/      # Elementos básicos (Button, Input, Loader)
├── molecules/  # Combinações simples (ProductCard, FormField)
├── organisms/  # Seções complexas (Header, ProductList, UserMenu)
├── templates/  # Layouts de página (AppLayout)
└── pages/      # Páginas completas (Home, ProductDetails)
```

#### **📦 Barrel Export Pattern**
Uso do barrel exports para imports limpos e organizados:

```typescript
// ❌ Sem barrel exports
import { UserAvatar } from './components/atoms/UserAvatar';
import { ProductImage } from './components/atoms/ProductImage';
import { SuspenseWrapper } from './components/atoms/SuspenseWrapper';

// ✅ Com barrel exports
import { UserAvatar, ProductImage, SuspenseWrapper } from '@/components/atoms';
```

**Exemplos de barrel exports no projeto:**

```typescript
// src/components/atoms/index.ts
export { LanguageSwitcher } from './LanguageSwitcher';
export { default as UserAvatar } from './UserAvatar';
export { default as ProductImage } from './ProductImage';
export { default as SuspenseWrapper } from './SuspenseWrapper';

// src/hooks/index.ts
export { useLanguage } from './useLanguage';
export { useProductFilters } from './useProductFilters';
export { useCategories } from './useCategories';
export { useCreateProduct } from './useCreateProduct';

// src/stores/index.ts
export { useAuthStore, useCartStore } from './authStore';
export type { CartItem } from './cartStore';
```

#### **🗂️ Organização por Domínio**
```
src/
├── components/     # UI Components (Atomic Design)
├── hooks/         # React Hooks customizados
├── services/      # API calls e business logic
├── stores/        # Estado global (Zustand)
├── lib/          # Utilitários e helpers
├── locales/      # Internacionalização
└── assets/       # Recursos estáticos
```

#### **🔄 Fluxo de Dados**
```
API (services) → React Query → Zustand/Context → Components
```

### **Stack Tecnológica**

#### **Frontend Core**
- **React 19.1** - Biblioteca principal
- **TypeScript 5.8** - Tipagem estática
- **Vite 6.3** - Build tool

#### **Styling & UI**
- **TailwindCSS 4.1** - Utility-first CSS
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos

#### **Estado & Dados**
- **TanStack Query 5.8** - Server state management
- **Zustand 5.0** - Client state management
- **React Hook Form 7.57** - Formulários performáticos

#### **Roteamento & Navegação**
- **React Router 7.6** - Roteamento SPA

#### **Internacionalização**
- **React i18next 15.5** - Suporte multilíngue

#### **Testes**
- **Vitest 3.2** - Testes unitários ultrarrápidos
- **Cypress 14.4** - Testes E2E
- **JSDOM 26.1** - DOM virtual para testes

#### **Qualidade de Código**
- **ESLint 9.25** - Linting JavaScript/TypeScript
- **Prettier 3.5** - Formatação de código
- **Husky 9.1** - Git hooks
- **Lint-staged 16.1** - Lint apenas arquivos staged
- **Conventional Commits** - Padronização de mensagens de commit

#### **HTTP & APIs**
- **Axios 1.9** - Cliente HTTP

## 🤔 Por que Vite ao invés de Next.js?

### **⚡ Vite - Escolha para este projeto**

1. **Performance de Desenvolvimento**
   - Bundling sob demanda
   - Ideal para desenvolvimento ágil

2. **Flexibilidade**
   - Não opinionated sobre estrutura
   - Fácil integração com diferentes ferramentas
   - Build otimizado com Rollup

3. **💡 Pq a Decisão para este projeto**

    - Este é um **protótipo/teste técnico** focado em:
      - ✅ Desenvolvimento rápido
      - ✅ Demonstrar skills frontend
      - ✅ Testes e qualidade de código
      - ✅ Componentes reutilizáveis


## 🎯 Decisões Arquiteturais

### **📁 Estrutura de Componentes**
```typescript
// Convenções claras de nomenclatura
components/
├── atoms/Button/index.tsx        # Componente base
├── molecules/ProductCard/        # Combinação de atoms
│   ├── index.tsx                # Componente principal
│   └── ProductCard.test.tsx     # Testes co-localizados

```

### **🔧 Patterns Implementados**

#### **Custom Hooks para Lógica de Negócio**
```typescript
// ✅ Separação clara de responsabilidades
const { products, isLoading, error } = useProductFilters();
const { createProduct } = useCreateProduct();
```

#### **React Query para Server State**
```typescript
// ✅ Cache inteligente e sincronização automática
const { data: categories } = useQuery({
  queryKey: [QUERY_KEYS.CATEGORIES],
  queryFn: () => categoryService.getCategories(),
  staleTime: 5 * 60 * 1000, // Cache por 5 minutos
});
```

#### **Zustand para Client State**
```typescript
// ✅ Estado global simples e performático
const { items, addToCart, removeFromCart } = useCartStore();
const { user, isAuthenticated } = useAuthStore();
```

#### **Barrel Exports para Imports Limpos**
```typescript
// ✅ Evita imports longos e melhora DX
import { ProductCard, ProductFilters } from '@/components/molecules';
import { useCategories, useCreateProduct } from '@/hooks';
```

#### **Path Mapping com @/ Alias**
```typescript
// ✅ Imports absolutos ao invés de relativos
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/lib/queryKeys';
```

### **🚀 Performance & Otimizações**

- **Lazy Loading**: Todas as páginas são carregadas sob demanda
- **Code Splitting**: Divisão automática por rotas
- **React Query Cache**: Reduz chamadas desnecessárias à API
- **Suspense Boundaries**: Loading states consistentes
- **Tree Shaking**: Apenas código usado é incluído no bundle

### **🧪 Estratégia de Testes**

- **Unit Tests**: Componentes isolados com Vitest
- **Integration Tests**: Fluxos completos com Testing Library
- **E2E Tests**: Jornadas do usuário com Cypress
- **Git Hooks**: Testes automáticos em commits/pushes

### **📝 Conventional Commits**

O projeto utiliza [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formato padrão
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

**Tipos disponíveis:**
```bash
feat:     # Nova funcionalidade
fix:      # Correção de bug
docs:     # Documentação
style:    # Formatação (sem mudança de lógica)
refactor: # Refatoração de código
test:     # Adição/correção de testes
chore:    # Tarefas de manutenção
perf:     # Melhorias de performance
ci:       # Configuração de CI/CD
build:    # Mudanças no sistema de build
```

**Exemplos práticos:**
```bash
feat: adicionar filtro por categoria
fix: corrigir erro de validação no formulário
docs: atualizar README com instruções de setup
refactor: migrar useState para React Query
test: adicionar testes para ProductCard
chore: atualizar dependências do projeto
```

**✅ Validação Automática:**
- O hook `commit-msg` valida automaticamente o formato
- Commits inválidos são **rejeitados** antes de serem criados
- Garante consistência em todo o histórico do projeto

**Benefícios:**
- ✅ **Clarity**: Mensagens claras e padronizadas
- ✅ **Automation**: Geração automática de changelogs
- ✅ **Semantic Versioning**: Versionamento baseado nos tipos
- ✅ **Team Collaboration**: Facilita code review e histórico

## 🧪 Testes

O projeto possui cobertura completa de testes:

- **Unitários**: Componentes, hooks e utilitários
- **E2E**: Jornadas do usuário com Cypress
