# Guia de Estilo CSS - Projeto Agrana

## Estrutura de CSS Baseada em Tema

Este projeto utiliza uma estrutura consistente de CSS baseada em variáveis de tema e mixins reutilizáveis.

### 1. Variáveis CSS Personalizadas

Todas as cores, espaçamentos e outros valores são definidos em `src/theme/variables.scss`:

#### Cores
- `--app-color-purple`: Cor principal roxa
- `--app-color-blue`: Cor secundária azul
- `--app-color-green`: Cor de sucesso verde
- E suas variações (`-light`, `-dark`)

#### Espaçamentos
- `--app-spacing-xs`: 8px
- `--app-spacing-sm`: 16px
- `--app-spacing-md`: 24px
- `--app-spacing-lg`: 32px
- `--app-spacing-xl`: 40px
- `--app-spacing-xxl`: 60px

#### Tipografia
- `--app-font-size-xs`: 12px
- `--app-font-size-sm`: 14px
- `--app-font-size-md`: 16px
- `--app-font-size-lg`: 24px
- `--app-font-size-xl`: 28px
- `--app-font-size-xxl`: 32px

### 2. Mixins Reutilizáveis

Definidos em `src/theme/mixins.scss`:

#### Layout
- `@include app-container`: Adiciona padding padrão
- `@include app-section-spacing`: Adiciona margem bottom padrão
- `@include app-text-center`: Centraliza texto

#### Componentes
- `@include app-card`: Estilo de card padrão
- `@include app-gradient-card`: Card com gradiente
- `@include app-button-primary`: Botão principal

#### Tipografia
- `@include app-text-title`: Título principal
- `@include app-text-subtitle`: Subtítulo
- `@include app-logo`: Estilo de logo

### 3. Estrutura de Arquivo SCSS

Cada página deve seguir esta estrutura:

```scss
// Importar mixins no topo
@import '../../theme/mixins.scss';

// Estilos principais da página
.page-content {
  // Usar variáveis CSS
  --background: var(--ion-color-light);
}

// Seções usando mixins
.header-section {
  @include app-text-center;
  @include app-section-spacing;
}

// Elementos usando classes utilitárias
.title {
  @extend .app-highlight-purple;
}
```

### 4. Classes Utilitárias Disponíveis

- `.app-container`: Container com padding
- `.app-section-spacing`: Espaçamento de seção
- `.app-text-center`: Texto centralizado
- `.app-card`: Card padrão
- `.app-highlight-purple`: Texto roxo
- `.app-highlight-blue`: Texto azul
- `.app-text-white`: Texto branco
- `.app-text-muted`: Texto esmaecido

### 5. Boas Práticas

1. **Sempre importar mixins**: `@import '../../theme/mixins.scss';`
2. **Usar variáveis CSS**: Prefira `var(--app-spacing-md)` ao invés de valores fixos
3. **Reutilizar mixins**: Use mixins para padrões comuns
4. **Manter consistência**: Siga a estrutura estabelecida
5. **Documentar mudanças**: Atualize este guia ao adicionar novos mixins ou variáveis

### 6. Exemplo Completo

```scss
@import '../../theme/mixins.scss';

.example-page {
  --background: var(--ion-color-light);
}

.header {
  @include app-text-center;
  @include app-section-spacing;
  background: var(--app-gradient-header);
  padding: var(--app-spacing-xxl) var(--app-spacing-md);
}

.title {
  @include app-text-title;
  
  .highlight {
    @extend .app-highlight-purple;
  }
}

.button {
  @include app-button-primary;
}
```

Este guia garante consistência visual e facilita a manutenção do código CSS em todo o projeto.
