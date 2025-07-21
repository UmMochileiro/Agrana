# Deploy Script for EasyPanel
echo "🚀 Starting EasyPanel deployment..."

# Verificar se temos as dependências
echo "📦 Installing dependencies..."
npm ci --only=production=false

# Build da aplicação
echo "🔨 Building application..."
npm run build:deploy

# Verificar se o build foi bem-sucedido
if [ -d "www" ]; then
    echo "✅ Build successful! www/ directory created"
    ls -la www/
else
    echo "❌ Build failed! www/ directory not found"
    exit 1
fi

echo "🎉 Deploy ready! Upload the 'www' folder to EasyPanel"
