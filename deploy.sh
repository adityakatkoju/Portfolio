#!/bin/bash

echo "🚀 Building portfolio for deployment..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Portfolio is ready for deployment."
    echo "📁 Build output: dist/"
    echo "🌐 Deploy to: https://adityakatkoju.github.io/Portfolio"
echo "🚀 Netlify: https://adityakatkoju-portfolio.netlify.app"
echo ""
echo "Next steps:"
echo "1. Push changes to GitHub: git push origin main"
echo "2. Enable GitHub Pages in your repository settings"
echo "3. Connect your repository to Netlify for auto-deployment"
echo "4. Your site will be available at both URLs above"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi
