const clientId = '68638649-005e-45d3-9781-d4c5efb59363';
const clientSecret = '4bffb155-4028-46c9-971a-feeaff6cdd3c';

async function testConnectors() {
    console.log('Testando endpoints do Pluggy...');
    
    try {
        // Primeiro fazer auth
        const authResponse = await fetch('https://api.pluggy.ai/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                clientSecret: clientSecret
            })
        });
        
        if (!authResponse.ok) {
            console.error('Erro na autenticação:', authResponse.status);
            return;
        }
        
        const authData = await authResponse.json();
        console.log('Autenticação OK, token:', authData.apiKey.substring(0, 50) + '...');
        
        // Agora testar o endpoint /connectors
        const connectorsResponse = await fetch('https://api.pluggy.ai/connectors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': authData.apiKey
            }
        });
        
        console.log('Status connectors:', connectorsResponse.status);
        
        if (connectorsResponse.ok) {
            const connectors = await connectorsResponse.json();
            console.log('Resposta completa:', JSON.stringify(connectors, null, 2));
            
            // Verificar se é um array ou objeto
            if (Array.isArray(connectors)) {
                console.log('Conectores encontrados:', connectors.length);
                const brConnectors = connectors.filter(c => c.country === 'BR');
                console.log('Conectores do Brasil:', brConnectors.length);
                if (brConnectors.length > 0) {
                    console.log('Primeiro conector BR:', brConnectors[0]);
                }
            } else if (connectors.results && Array.isArray(connectors.results)) {
                console.log('Conectores encontrados:', connectors.results.length);
                const brConnectors = connectors.results.filter(c => c.country === 'BR');
                console.log('Conectores do Brasil:', brConnectors.length);
                if (brConnectors.length > 0) {
                    console.log('Primeiro conector BR:', brConnectors[0]);
                }
            } else {
                console.log('Formato inesperado da resposta');
            }
        } else {
            const errorText = await connectorsResponse.text();
            console.error('Erro ao buscar conectores:', errorText);
        }
        
    } catch (error) {
        console.error('Erro geral:', error);
    }
}

testConnectors();
