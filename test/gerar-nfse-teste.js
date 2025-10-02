const { create } = require('xmlbuilder2');

// Dados de teste para referencia
const dadosTeste = {
  numero: "123456",
  prestador: {
    cnpj: "12345678000195",
    razaoSocial: "MINHA EMPRESA LTDA",
    endereco: {
      logradouro: "RUA PRINCIPAL",
      numero: "123",
      bairro: "CENTRO",
      cidade: "SAO PAULO",
      codigoIBGE: "3550308",
      uf: "SP",
      cep: "01234000"
    }
  },
  tomador: {
    cpf: "12345678900",
    nome: "JOAO DA SILVA"
  },
  servico: {
    codigo: "010701",
    descricao: "DESENVOLVIMENTO DE SOFTWARE",
    valor: "1500.00"
  }
};

console.log("🎯 Gerando XML de teste da NFS-e...\n");

// Montagem MANUAL do objeto XML
const nfseObject = {
  NFSe: {
    '@xmlns': 'http://www.sped.fazenda.gov.br/nfse',
    '@versao': '1.00',
    infNFSe: {
      '@Id': `NFS${dadosTeste.numero}`,
      
      // Dados básicos
      xLocEmi: dadosTeste.prestador.endereco.cidade,
      xLocPrestacao: dadosTeste.prestador.endereco.cidade,
      nNFSe: dadosTeste.numero,
      verAplic: "MeuGerador 1.0",
      ambGer: "2", // 2 = Homologação
      tpEmis: "1", // 1 = Emissão normal
      procEmi: "1", // 1 = App do contribuinte
      cStat: "100", // 100 = NFS-e Gerada
      dhProc: new Date().toISOString(),
      nDFSe: dadosTeste.numero,
      
      // PRESTADOR - Bloco emitente
      emit: {
        CNPJ: dadosTeste.prestador.cnpj,
        xNome: dadosTeste.prestador.razaoSocial,
        enderNac: {
          xLgr: dadosTeste.prestador.endereco.logradouro,
          nro: dadosTeste.prestador.endereco.numero,
          xBairro: dadosTeste.prestador.endereco.bairro,
          cMun: dadosTeste.prestador.endereco.codigoIBGE,
          UF: dadosTeste.prestador.endereco.uf,
          CEP: dadosTeste.prestador.endereco.cep
        }
      },
      
      // VALORES - Bloco simples
      valores: {
        vLiq: dadosTeste.servico.valor
      },
      
      // DPS - Documento principal
      DPS: {
        '@versao': '1.00',
        infDPS: {
          '@Id': `DPS${dadosTeste.numero}`,
          
          // Identificação
          tpAmb: "2",
          dhEmi: new Date().toISOString(),
          verAplic: "MeuGerador 1.0",
          serie: "A",
          nDPS: dadosTeste.numero,
          dCompet: new Date().toISOString().split('T')[0].replace(/-/g, ''),
          tpEmit: "1",
          cLocEmi: dadosTeste.prestador.endereco.codigoIBGE,
          
          // PRESTADOR dentro do DPS
          prest: {
            CNPJ: dadosTeste.prestador.cnpj,
            xNome: dadosTeste.prestador.razaoSocial,
            regTrib: {
              opSimpNac: "1", // 1 = Não optante
              regEspTrib: "0"  // 0 = Nenhum
            }
          },
          
          // TOMADOR
          toma: {
            CPF: dadosTeste.tomador.cpf,
            xNome: dadosTeste.tomador.nome
          },
          
          // SERVIÇO
          serv: {
            locPrest: {
              cLocPrestacao: dadosTeste.prestador.endereco.codigoIBGE
            },
            cServ: {
              cTribNac: dadosTeste.servico.codigo,
              xDescServ: dadosTeste.servico.descricao
            }
          },
          
          // VALORES detalhados
          valores: {
            vServPrest: {
              vServ: dadosTeste.servico.valor
            },
            trib: {
              tribMun: {
                tribISSQN: "1", // 1 = Operação tributável
                tpRetISSQN: "1" // 1 = Não retido
              },
              totTrib: {
                indTotTrib: "0" // 0 = Não informar tributos
              }
            }
          }
        }
      }
    }
  }
};

// CONVERSÃO para XML
const xml = create(nfseObject).end({ pretty: true });

// RESULTADO
console.log("✅ XML GERADO COM SUCESSO!\n");
console.log("==========================================");
console.log(xml);
console.log("==========================================");

// Informações úteis
console.log("\n📊 INFORMAÇÕES DO XML:");
console.log(`- Número da NFS-e: ${dadosTeste.numero}`);
console.log(`- Prestador: ${dadosTeste.prestador.razaoSocial}`);
console.log(`- CNPJ: ${dadosTeste.prestador.cnpj}`);
console.log(`- Tomador: ${dadosTeste.tomador.nome}`);
console.log(`- Serviço: ${dadosTeste.servico.descricao}`);
console.log(`- Valor: R$ ${dadosTeste.servico.valor}`);
console.log(`- Ambiente: Homologação (2)`);

console.log("\n💡 DICAS:");
console.log("- Modifique os dados no início do arquivo");
console.log("- Teste com diferentes códigos de serviço");
console.log("- Valide o XML gerado contra os XSDs");