/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Routers,
  useTdmServices,
} from '../../Thymio2pConfigurator/useTdmConfigurator';
import useAsyncStorageArray from '../Sidebar/useAccesTDM';
import {useLanguage} from '../../i18n';

type ItemThymio2pProps = {
  option: any;
  index: number;
  data: any;
};

const ItemThymio2p = ({option, index, data}: ItemThymio2pProps) => {
  const {name, url} = option;

  return (
    <View key={name} style={styles.item}>
      <Text style={styles.title}>{JSON.stringify(name)}</Text>
    </View>
  );
};

const sortServices = (
  a: {name: string | string[]},
  b: {name: string | string[]},
) => {
  // Verificar que 'name' existe y es un string antes de llamar a 'includes'
  const aIncludesThymio =
    a.name && typeof a.name === 'string' && a.name.includes('Thymio');
  const bIncludesThymio =
    b.name && typeof b.name === 'string' && b.name.includes('Thymio');

  if (aIncludesThymio && !bIncludesThymio) {
    return 1; // a viene antes que b
  } else if (!aIncludesThymio && bIncludesThymio) {
    return -1; // b viene antes que a
  } else {
    return 0; // no cambia el orden
  }
};

type SimpleTableProps = {
  data: Routers[];
};

const SimpleTable: React.FC<SimpleTableProps> = ({data}) => {
  return (
    <View style={stylesTable.table}>
      <ScrollView horizontal={true}>
        <View>
          {/* Encabezado de la tabla */}
          <View style={stylesTable.row}>
            <Text style={[stylesTable.cell, stylesTable.headerCell]}>Name</Text>
            <Text style={[stylesTable.cell, stylesTable.headerCell]}>IP</Text>
            <Text style={[stylesTable.cell, stylesTable.headerCell]}>Port</Text>
            <Text style={[stylesTable.cell, stylesTable.headerCell]}>
              WS Port
            </Text>
          </View>
          {/* Filas de datos */}
          {data.map((item, index) => (
            <View key={index} style={stylesTable.row}>
              <Text style={stylesTable.cell}>{item.name}</Text>
              <Text style={stylesTable.cell}>{item.ip}</Text>
              <Text style={stylesTable.cell}>{item.port}</Text>
              <Text style={stylesTable.cell}>{item.wsPort}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// Estilos para la tabla
const stylesTable = StyleSheet.create({
  table: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  cell: {
    flex: 1, // Establece que todas las celdas se expandan de manera uniforme
    marginHorizontal: 5,
    textAlign: 'center',
    paddingVertical: 10,
    width: 150, // Ancho fijo para todas las celdas
  },
  headerCell: {
    fontWeight: 'bold', // Texto en negrita para el encabezado
    backgroundColor: '#ddd', // Fondo más oscuro para el encabezado
    width: 150, // Ancho fijo para todas las celdas
  },
});

export const TDMexplorer = () => {
  const {language, i18n} = useLanguage();
  const {TDMServices, servicesNames, scan, loading} = useTdmServices();
  const [data, setData] = useAsyncStorageArray('accessTDMServices', []);

  if (loading) {
    return (
      <View style={styles.spinnerStyle}>
        <ActivityIndicator size="large" color="#0A9EEB" />
      </View>
    );
  }

  if (TDMServices.length === 0) {
    return (
      <View style={styles2.container}>
        <Text style={styles2.title}>
          {i18n.t('tdm_explorer_no_services_found')}
        </Text>
        <Text style={styles2.subtitle}>
          {i18n.t('tdm_explorer_scan_again')}
        </Text>
        <TouchableOpacity
          style={styles2.button}
          onPress={() => {
            scan();
          }}>
          <Text style={styles2.buttonText}>
            {i18n.t('tdm_explorer_scan_again_message')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <View style={{height: 30}} />
      <Text>
        Actualmente estas conectado a {TDMServices.length} punto de conexion
      </Text>
      <SimpleTable data={TDMServices.sort(sortServices)} />
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  url: {
    fontSize: 14,
    color: '#555',
  },
  add: {
    fontSize: 16,
    color: 'blue',
  },
});
