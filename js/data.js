/* Banco inicial de preguntas demostrativas. Cada evaluación contiene 10 reactivos. */
window.NEUROLEARN = (() => {
 const topics = {
  Administración: {
   Básico: [
    ['¿Qué es la administración?',['El proceso de coordinar recursos para lograr objetivos','Un registro contable','Una técnica de ventas','Un sistema de producción'],0,'Concepto de administración'],
    ['¿Cuál es una función administrativa?',['Improvisar','Planear','Adivinar','Duplicar'],1,'Proceso administrativo'],
    ['¿Qué busca la organización dentro de una empresa?',['Eliminar objetivos','Distribuir tareas y recursos','Evitar la comunicación','Reducir toda actividad'],1,'Organización'],
    ['¿Qué es un objetivo?',['Un resultado que se desea alcanzar','Una actividad sin propósito','Un gasto fijo','Un documento fiscal'],0,'Planeación'],
    ['¿Qué recurso representa al personal?',['Financiero','Material','Humano','Tecnológico'],2,'Recursos organizacionales'],
    ['¿Qué función consiste en orientar al equipo?',['Dirección','Control','Archivo','Compra'],0,'Dirección'],
    ['¿Para qué sirve el control administrativo?',['Para comparar resultados con lo planeado','Para eliminar la planeación','Para evitar medir','Para sustituir al personal'],0,'Control'],
    ['¿Qué es una empresa?',['Una organización que ofrece bienes o servicios','Un trámite bancario','Un solo producto','Una norma contable'],0,'Organizaciones'],
    ['¿Qué elemento ayuda a coordinar al equipo?',['Comunicación','Aislamiento','Desorden','Duplicidad'],0,'Comunicación'],
    ['¿Qué significa eficiencia?',['Lograr resultados usando adecuadamente los recursos','Aumentar tareas sin medir','Evitar objetivos','Trabajar sin planificación'],0,'Eficiencia']
   ],
   Intermedio: [
    ['¿Qué etapa define metas y acciones futuras?',['Control','Planeación','Dirección','Supervisión'],1,'Planeación estratégica'],
    ['¿Qué herramienta analiza fortalezas y amenazas?',['FODA','PEPS','Balance','Organigrama'],0,'Análisis FODA'],
    ['¿Qué representa un organigrama?',['La estructura de puestos y relaciones','El flujo de efectivo','El inventario','El calendario fiscal'],0,'Estructura organizacional'],
    ['¿Qué estilo de liderazgo promueve participación?',['Autocrático','Participativo','Ausente',' coercitivo'],1,'Liderazgo'],
    ['¿Qué indicador permite medir el cumplimiento de una meta?',['KPI','RFC','IVA','SKU'],0,'Indicadores'],
    ['¿Qué es delegar?',['Transferir tareas y autoridad definida','Evitar responsabilidades','Eliminar puestos','Duplicar reportes'],0,'Delegación'],
    ['¿Qué busca la mejora continua?',['Perfeccionar procesos de forma constante','Mantener errores','Evitar mediciones','Aumentar desperdicio'],0,'Mejora continua'],
    ['¿Qué describe la cultura organizacional?',['Valores y prácticas compartidas','Solo el mobiliario','El precio de venta','La lista de clientes'],0,'Cultura organizacional'],
    ['¿Qué permite un presupuesto?',['Planear ingresos y gastos','Medir clima laboral','Asignar vacaciones','Definir logotipos'],0,'Planeación financiera'],
    ['¿Qué es una ventaja competitiva?',['Un atributo que diferencia favorablemente a la organización','Una obligación fiscal','Un gasto operativo','Una sanción'],0,'Estrategia']
   ],
   Avanzado: [
    ['¿Qué enfoque prioriza eliminar actividades que no agregan valor?',['Lean management','Mercadotecnia masiva','Contabilidad fiscal','Estructura matricial'],0,'Gestión Lean'],
    ['¿Qué evalúa el cuadro de mando integral?',['Perspectivas financieras y no financieras','Solo ventas','Únicamente inventarios','Solo asistencia'],0,'Cuadro de mando integral'],
    ['¿Qué caracteriza a una estructura matricial?',['Doble relación de autoridad por función y proyecto','Ausencia de responsables','Jerarquía única e invariable','Eliminación de equipos'],0,'Diseño organizacional'],
    ['¿Qué es la gestión del cambio?',['Preparar y acompañar la transición organizacional','Cambiar puestos sin comunicación','Eliminar procesos de evaluación','Evitar capacitación'],0,'Gestión del cambio'],
    ['¿Qué busca la gestión por procesos?',['Coordinar actividades para generar valor al usuario','Separar áreas sin conexión','Medir solo costos','Evitar estándares'],0,'Gestión por procesos'],
    ['¿Qué representa el costo de oportunidad?',['El valor de la mejor alternativa sacrificada','El total de impuestos','El costo histórico','El precio de lista'],0,'Toma de decisiones'],
    ['¿Qué es una estrategia de diferenciación?',['Ofrecer atributos percibidos como únicos','Competir solo por volumen','Copiar procesos sin cambios','Reducir comunicación'],0,'Estrategia competitiva'],
    ['¿Qué práctica fortalece la gestión del conocimiento?',['Documentar y compartir aprendizajes','Guardar información sin acceso','Evitar capacitación','Eliminar retroalimentación'],0,'Gestión del conocimiento'],
    ['¿Qué implica la responsabilidad social empresarial?',['Considerar impactos sociales y ambientales','Priorizar solo ganancias inmediatas','Evitar rendición de cuentas','Reducir transparencia'],0,'Responsabilidad social'],
    ['¿Qué permite un análisis de escenarios?',['Explorar resultados posibles ante distintas condiciones','Asegurar un único futuro','Sustituir datos por intuición','Evitar riesgos'],0,'Planeación estratégica']
   ]
  },
  Contabilidad: {
   Básico: [
    ['¿Qué registra la contabilidad?',['Operaciones económicas de una entidad','Solo horarios','Únicamente ventas futuras','Opiniones personales'],0,'Concepto contable'],
    ['¿Cuál es la ecuación contable básica?',['Activo = Pasivo + Capital','Activo = Ventas - IVA','Pasivo = Ingreso + Gasto','Capital = Activo + Pasivo'],0,'Ecuación contable'],
    ['¿Qué representa el activo?',['Bienes y derechos','Deudas únicamente','Aportaciones de socios','Gastos del periodo'],0,'Activo'],
    ['¿Qué representa el pasivo?',['Obligaciones y deudas','Bienes disponibles','Ingresos por ventas','Capital aportado'],0,'Pasivo'],
    ['¿Qué es el capital contable?',['La participación residual de los propietarios','El total de deudas','El efectivo en caja','Las compras del mes'],0,'Capital contable'],
    ['¿Cuál es un estado financiero básico?',['Balance general','Lista de asistencia','Organigrama','Plan de ventas'],0,'Estados financieros'],
    ['¿Qué es un ingreso?',['Un aumento de beneficios económicos','Una deuda','Una salida de efectivo siempre','Una aportación obligatoria'],0,'Ingresos'],
    ['¿Qué es un gasto?',['Un consumo de recursos para operar','Un derecho de cobro','Una aportación de socios','Un activo fijo'],0,'Gastos'],
    ['¿Qué documento comprueba una operación de compra?',['Factura','Organigrama','Nómina de puestos','Presupuesto anual'],0,'Documentación'],
    ['¿Qué registra el libro diario?',['Operaciones en orden cronológico','Solo saldos finales','Únicamente activos fijos','Metas comerciales'],0,'Libros contables']
   ],
   Intermedio: [
    ['¿Qué indica el principio de partida doble?',['Toda operación afecta al menos dos cuentas','Cada operación usa una sola cuenta','No se registran pasivos','Los gastos no se reconocen'],0,'Partida doble'],
    ['¿Qué naturaleza tiene normalmente la cuenta Caja?',['Deudora','Acreedora','Sin saldo','Fiscal'],0,'Naturaleza de cuentas'],
    ['¿Qué estado muestra ingresos y gastos de un periodo?',['Estado de resultados','Balance general','Estado de cambios en capital','Conciliación bancaria'],0,'Estados financieros'],
    ['¿Qué es una cuenta por cobrar?',['Un derecho de cobro a un cliente','Una deuda con proveedor','Un gasto pagado','Una aportación de capital'],0,'Cuentas por cobrar'],
    ['¿Qué método calcula primero las salidas con costos más antiguos?',['PEPS','UEPS','Promedio simple','Depreciación lineal'],0,'Inventarios'],
    ['¿Qué es una depreciación?',['Distribución del costo de un activo durante su vida útil','Aumento automático del activo','Pago de impuestos','Registro de ventas'],0,'Depreciación'],
    ['¿Qué busca una conciliación bancaria?',['Identificar diferencias entre banco y registros','Calcular nómina','Valuar inventario','Determinar ventas futuras'],0,'Conciliación'],
    ['¿Qué cuenta registra una deuda con proveedores?',['Proveedores','Clientes','Caja','Ventas'],0,'Pasivos'],
    ['¿Qué representa el IVA acreditable para una empresa?',['Impuesto pagado en compras que puede acreditarse','Impuesto cobrado en ventas','Una utilidad','Un ingreso financiero'],0,'Impuestos'],
    ['¿Qué es un asiento de ajuste?',['Registro para reconocer operaciones del periodo correctamente','Una cancelación de todas las cuentas','Una factura de venta','Un conteo físico'],0,'Ajustes contables']
   ],
   Avanzado: [
    ['¿Qué principio requiere reconocer ingresos cuando se devengan?',['Devengación contable','Consistencia visual','Valor de mercado','Prudencia comercial'],0,'Normas contables'],
    ['¿Qué mide principalmente la razón circulante?',['Capacidad de cubrir pasivos de corto plazo','Rentabilidad del capital','Rotación de activos fijos','Margen bruto'],0,'Análisis financiero'],
    ['¿Cómo se calcula el margen bruto?',['(Ventas netas - costo de ventas) / ventas netas','Utilidad neta / pasivo','Activo / capital','Gastos / inventario'],0,'Rentabilidad'],
    ['¿Qué método de depreciación distribuye el importe depreciable uniformemente?',['Línea recta','Unidades producidas únicamente','Saldo decreciente','Costo promedio'],0,'Depreciación'],
    ['¿Qué es una provisión contable?',['Un pasivo de importe o vencimiento incierto','Un ingreso cobrado','Un activo intangible','Una cuenta de orden siempre'],0,'Provisiones'],
    ['¿Qué representa el valor presente?',['Valor actual de flujos futuros descontados','Suma nominal sin descuento','Valor histórico de compra','Precio de venta al público'],0,'Valor del dinero'],
    ['¿Qué estado explica cambios en el efectivo?',['Estado de flujos de efectivo','Estado de resultados','Balance general','Estado de costos'],0,'Flujos de efectivo'],
    ['¿Qué es una unidad generadora de efectivo?',['Grupo identificable que genera entradas de efectivo independientes','Una cuenta bancaria','Un centro de costos sin activos','Un inventario'],0,'Deterioro de activos'],
    ['¿Qué indica un resultado negativo en capital de trabajo?',['Los pasivos circulantes superan los activos circulantes','Hay exceso de efectivo','La empresa no tiene deudas','La utilidad es positiva'],0,'Capital de trabajo'],
    ['¿Qué busca una auditoría financiera?',['Obtener evidencia para opinar sobre estados financieros','Preparar campañas de venta','Definir salarios','Administrar inventarios diarios'],0,'Auditoría']
   ]
  }
 };
 const questions = {};
 Object.entries(topics).forEach(([subject, levels]) => Object.entries(levels).forEach(([level, rows]) => {
  questions[`${subject}|${level}`] = rows.map((r,i)=>({id:`${subject}-${level}-${i+1}`,text:r[0],options:r[1],answer:r[2],topic:r[3]}));
 }));
 const courses = [
  {id:'adm-plan',title:'Fundamentos de planeación',subject:'Administración',topic:'Planeación',description:'Herramientas para definir objetivos, prioridades y acciones.'},
  {id:'adm-lead',title:'Liderazgo y trabajo en equipo',subject:'Administración',topic:'Liderazgo',description:'Comunicación, coordinación y liderazgo participativo.'},
  {id:'adm-proc',title:'Gestión y mejora de procesos',subject:'Administración',topic:'Mejora continua',description:'Identificación de oportunidades y mejora de procesos.'},
  {id:'adm-strat',title:'Estrategia organizacional',subject:'Administración',topic:'Estrategia',description:'Análisis del entorno y toma de decisiones.'},
  {id:'cont-base',title:'Fundamentos de contabilidad',subject:'Contabilidad',topic:'Concepto contable',description:'Conceptos, cuentas y registros básicos.'},
  {id:'cont-est',title:'Lectura de estados financieros',subject:'Contabilidad',topic:'Estados financieros',description:'Interpretación de información financiera.'},
  {id:'cont-inv',title:'Control y valuación de inventarios',subject:'Contabilidad',topic:'Inventarios',description:'Métodos de valuación y control de existencias.'},
  {id:'cont-anal',title:'Análisis financiero',subject:'Contabilidad',topic:'Análisis financiero',description:'Indicadores de liquidez, actividad y rentabilidad.'}
 ];
 return {questions,courses,levels:['Básico','Intermedio','Avanzado'],subjects:Object.keys(topics)};
})();
