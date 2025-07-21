const clientId = '68638649-005e-45d3-9781-d4c5efb59363';
const clientSecret = '4bffb155-4028-46c9-971a-feeaff6cdd3c';

async function testConnection() {
    console.log('Testando criação de conexão...');
    
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
        
        const authData = await authResponse.json();
        console.log('Auth OK');
        
        // Primeiro buscar os conectores para ver os campos obrigatórios
        const connectorsResponse = await fetch('https://api.pluggy.ai/connectors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': authData.apiKey
            }
        });
        
        const connectorsData = await connectorsResponse.json();
        const bbConnector = connectorsData.results.find(c => c.id === 611);
        console.log('BB Connector credentials:', JSON.stringify(bbConnector.credentials, null, 2));
        
        // Testar criação de conexão usando os campos corretos
        const testConnector = 611; // Banco do Brasil
        const testCredentials = {
            cpf: '12345678901' // Usando o campo correto
        };
        
        console.log('Tentando criar conexão com:', testCredentials);
        
        const connectionResponse = await fetch('https://api.pluggy.ai/connections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': authData.apiKey
            },
            body: JSON.stringify({
                connector_id: testConnector,
                credentials: testCredentials
            })
        });
        
        console.log('Connection status:', connectionResponse.status);
        const connectionResult = await connectionResponse.text();
        console.log('Connection result:', connectionResult);
        
    } catch (error) {
        console.error('Erro:', error);
    }
}

testConnection();
