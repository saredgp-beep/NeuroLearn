(() => {
 'use strict';
 const $ = (selector, root=document) => root.querySelector(selector);
 const read = key => { try { const value=JSON.parse(localStorage.getItem(key)); return Array.isArray(value)?value:[]; } catch { return []; } };
 const write = (key,value) => localStorage.setItem(key,JSON.stringify(value));
 const questions = window.NEUROLEARN?.questions || {};
 const courses = window.NEUROLEARN?.courses || [];
 const levels = ['Básico','Intermedio','Avanzado'];
 const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const getResults = () => read('nl_results');
 const getAssignments = () => read('nl_assignments');
 const studentName = () => (localStorage.getItem('nl_student_name') || '').trim() || 'Estudiante';

 // Modal reutilizable: se crea una sola vez y funciona con clic exterior y Escape.
 function ensureModal(){
  let root=$('#nlModal');
  if(root) return root;
  root=document.createElement('div'); root.id='nlModal'; root.className='modal-backdrop hidden';
  root.innerHTML=`<section class="app-modal" role="dialog" aria-modal="true" aria-labelledby="nlModalTitle" tabindex="-1"><header class="modal-header"><h2 id="nlModalTitle"></h2><button type="button" class="close-button" data-modal-close aria-label="Cerrar ventana">×</button></header><div class="modal-content" id="nlModalContent"></div></section>`;
  document.body.append(root);
  root.addEventListener('click',e=>{if(e.target===root || e.target.closest('[data-modal-close]')) closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && !root.classList.contains('hidden')) closeModal();});
  return root;
 }
 let lastFocus=null;
 function openModal(title,content){
  const root=ensureModal(); lastFocus=document.activeElement;
  $('#nlModalTitle',root).textContent=title;
  $('#nlModalContent',root).innerHTML=content;
  root.classList.remove('hidden'); document.body.classList.add('modal-open');
  $('.app-modal',root).focus();
 }
 function closeModal(){
  const root=$('#nlModal'); if(!root)return;
  root.classList.add('hidden'); document.body.classList.remove('modal-open');
  if(lastFocus?.isConnected) lastFocus.focus();
 }

 const passedLevels = (student,subject) => new Set(getResults().filter(r=>String(r.student).toLowerCase()===student.toLowerCase() && r.subject===subject && r.passed).map(r=>r.level));
 const passedCount = (student,subject) => levels.filter(level=>passedLevels(student,subject).has(level)).length;
 const currentLevel = (student,subject) => levels.find(level=>!passedLevels(student,subject).has(level)) || null;

 const nameInput=$('#studentName');
 if(nameInput){
  nameInput.value=localStorage.getItem('nl_student_name')||'';
  nameInput.addEventListener('input',()=>{localStorage.setItem('nl_student_name',nameInput.value.trim());renderStudent();});
  renderStudent();
 }
 function renderStudent(){
  const name=studentName();
  const results=getResults().filter(r=>String(r.student).toLowerCase()===name.toLowerCase());
  const assignments=getAssignments().filter(a=>String(a.student).toLowerCase()===name.toLowerCase());
  const avg=results.length?Math.round(results.reduce((sum,r)=>sum+(Number(r.score)||0),0)/results.length):0;
  $('#studentSummary').innerHTML=`<div class="stat-card"><small>Evaluaciones</small><strong>${results.length}</strong><span>completadas</span></div><div class="stat-card"><small>Promedio</small><strong>${avg}%</strong><span>de tus intentos</span></div><div class="stat-card"><small>Cursos asignados</small><strong>${assignments.length}</strong><span>por tu docente</span></div>`;
  $('#subjects').innerHTML=window.NEUROLEARN.subjects.map(subject=>{
   const level=currentLevel(name,subject); const done=passedCount(name,subject); const complete=!level;
   return `<article class="subject-card"><div class="subject-head"><span class="subject-symbol">${subject==='Administración'?'A':'C'}</span><span class="level-pill">${complete?'Completado':`Nivel ${done+1} de 3`}</span></div><h3>${escapeHTML(subject)}</h3><p>${complete?'Has completado todos los niveles.':`Tu siguiente evaluación es de nivel ${level}.`}</p><div class="level-track">${levels.map((l,i)=>`<span class="${passedLevels(name,subject).has(l)?'filled':''}"></span>`).join('')}</div><button class="button" data-start="${escapeHTML(subject)}" ${complete?'disabled':''}>${complete?'Completado':'Iniciar evaluación'}</button></article>`;
  }).join('');
  $('#subjects').querySelectorAll('[data-start]').forEach(button=>button.addEventListener('click',()=>startExam(button.dataset.start,name)));
  $('#assignedCourses').innerHTML=assignments.length?assignments.map(a=>{const course=courses.find(c=>c.id===a.courseId);return course?`<article class="course-row"><div><span class="eyebrow">${escapeHTML(course.subject)}</span><h3>${escapeHTML(course.title)}</h3><p>${escapeHTML(course.description)}</p>${a.message?`<small>Mensaje: ${escapeHTML(a.message)}</small>`:''}</div><span class="status-tag">Asignado</span></article>`:''}).join(''):'<div class="empty-state">Todavía no tienes cursos asignados. Cuando tu docente te asigne uno, aparecerá aquí.</div>';
  $('#studentHistory').innerHTML=results.length?`<table><thead><tr><th>Materia</th><th>Nivel</th><th>Resultado</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>${results.slice().reverse().map(r=>`<tr><td>${escapeHTML(r.subject)}</td><td>${escapeHTML(r.level)}</td><td>${Number(r.score)||0}/100</td><td>${new Date(r.date).toLocaleDateString('es-MX')}</td><td><span class="${r.passed?'status-tag':'status-tag status-warn'}">${r.passed?'Aprobado':'Por reforzar'}</span></td></tr>`).join('')}</tbody></table>`:'<div class="empty-state">Aún no hay evaluaciones registradas.</div>';
 }

 function startExam(subject,student){
  const level=currentLevel(student,subject); const list=questions[`${subject}|${level}`];
  if(!level){openModal('Materia completada','<p>Ya aprobaste los tres niveles de esta materia.</p>');return;}
  if(!Array.isArray(list)||!list.length){openModal('Evaluación no disponible','<p>No se encontró un banco de preguntas para esta materia y nivel.</p>');return;}
  let index=0; const answers=[];
  function draw(){
   const q=list[index];
   openModal(`Evaluación · ${subject}`,`<div class="exam-modal"><div class="exam-top"><div><span class="eyebrow">${escapeHTML(level)}</span><h3>Pregunta ${index+1} de ${list.length}</h3></div><span class="exam-meta">${Math.round(index/list.length*100)}% completado</span></div><div class="exam-progress"><span style="width:${(index/list.length)*100}%"></span></div><p class="question-text">${escapeHTML(q.text)}</p><div class="answer-options">${q.options.map((option,i)=>`<button type="button" class="answer-option" data-answer="${i}"><span>${String.fromCharCode(65+i)}</span>${escapeHTML(option)}</button>`).join('')}</div><div class="exam-actions"><button type="button" class="button button-outline" id="cancelExam">Salir</button><button type="button" class="button" id="nextQuestion" disabled>${index===list.length-1?'Finalizar evaluación':'Siguiente →'}</button></div></div>`);
   let selected=null;
   $('#nlModalContent').querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{
    selected=Number(button.dataset.answer);
    $('#nlModalContent').querySelectorAll('[data-answer]').forEach(option=>option.classList.toggle('selected',option===button));
    $('#nextQuestion').disabled=false;
   }));
   $('#cancelExam').addEventListener('click',()=>{
    openModal('¿Salir de la evaluación?','<p>Tu avance de esta evaluación no se guardará.</p><div class="modal-actions"><button class="button button-outline" id="keepExam">Continuar evaluación</button><button class="button" id="confirmExit">Salir</button></div>');
    $('#keepExam').addEventListener('click',draw);
    $('#confirmExit').addEventListener('click',closeModal);
   });
   $('#nextQuestion').addEventListener('click',()=>{if(selected===null)return;answers.push(selected);index++;if(index<list.length)draw();else finish();});
  }
  function finish(){
   const correct=answers.filter((answer,i)=>answer===list[i].answer).length;
   const score=Math.round(correct/list.length*100); const mistakes=list.filter((q,i)=>answers[i]!==q.answer); const passed=correct>=8;
   const record={id:Date.now(),student,subject,level,score,correct,total:list.length,passed,date:new Date().toISOString(),mistakes:mistakes.map(q=>({topic:q.topic,question:q.text,correctAnswer:q.options[q.answer]}))};
   const all=getResults();all.push(record);write('nl_results',all);renderStudent();
   openModal('Resultado de evaluación',`<div class="result-card"><span class="eyebrow">EVALUACIÓN FINALIZADA</span><div class="result-score">${score}<small>/100</small></div><h3>${passed?'¡Buen trabajo!':'Vamos a reforzar algunos temas'}</h3><p>Respondiste correctamente ${correct} de ${list.length} preguntas. ${passed?'Aprobaste este nivel; el siguiente quedó desbloqueado.':'Necesitas al menos 8 respuestas correctas para aprobar. Puedes intentarlo nuevamente.'}</p>${mistakes.length?`<div class="mistake-list"><h4>Temas para repasar</h4>${mistakes.map(m=>`<div><b>${escapeHTML(m.topic)}</b><p>${escapeHTML(m.question)}</p><small>Respuesta correcta: ${escapeHTML(m.correctAnswer)}</small></div>`).join('')}</div>`:'<p class="success-note">Todas tus respuestas fueron correctas.</p>'}<button class="button" id="backToSubjects">Volver a mis materias</button></div>`);
   $('#backToSubjects').addEventListener('click',()=>{closeModal();renderStudent();});
  }
  draw();
 }

 const teacherStats=$('#teacherStats');
 if(teacherStats){
  function renderTeacher(){
   const results=getResults(); const students=[...new Set(results.map(r=>String(r.student).toLowerCase()))]; const avg=results.length?Math.round(results.reduce((sum,r)=>sum+(Number(r.score)||0),0)/results.length):0;
   teacherStats.innerHTML=`<div class="stat-card"><small>Evaluaciones realizadas</small><strong>${results.length}</strong><span>intentos registrados</span></div><div class="stat-card"><small>Estudiantes activos</small><strong>${students.length}</strong><span>con actividad</span></div><div class="stat-card"><small>Promedio general</small><strong>${avg}%</strong><span>de resultados</span></div>`;
  }
  const table=$('#evaluationTable');
  function renderTable(){
   const rows=getResults().slice().reverse();
   table.innerHTML=rows.length?`<table><thead><tr><th>Estudiante</th><th>Materia</th><th>Nivel</th><th>Resultado</th><th>Fecha</th><th></th></tr></thead><tbody>${rows.map(r=>`<tr><td>${escapeHTML(r.student)}</td><td>${escapeHTML(r.subject)}</td><td>${escapeHTML(r.level)}</td><td>${Number(r.score)||0}/100</td><td>${new Date(r.date).toLocaleDateString('es-MX')}</td><td><button class="table-action" data-detail="${r.id}">Ver análisis</button></td></tr>`).join('')}</tbody></table>`:'<div class="empty-state">Aún no hay evaluaciones. Cuando un estudiante complete una, aparecerá aquí.</div>';
   table.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>showDetail(Number(button.dataset.detail))));
  }
  function showDetail(id){
   const record=getResults().find(item=>item.id===id);if(!record)return;
   const mistakes=record.mistakes||[];
   const related=courses.filter(course=>course.subject===record.subject&&mistakes.some(m=>String(m.topic).toLowerCase().includes(String(course.topic).toLowerCase())||String(course.topic).toLowerCase().includes(String(m.topic).toLowerCase())));
   openModal('Análisis de evaluación',`<div class="detail-card"><div class="detail-heading"><div><span class="eyebrow">${escapeHTML(record.subject)} · ${escapeHTML(record.level)}</span><h3>${escapeHTML(record.student)}</h3></div><strong>${Number(record.score)||0}/100</strong></div><p>${record.passed?'Evaluación aprobada.':'Resultado por debajo del mínimo de aprobación (80%).'}</p><h4>Temas que requieren atención</h4>${mistakes.length?`<ul>${mistakes.map(m=>`<li><b>${escapeHTML(m.topic)}</b> — ${escapeHTML(m.question)}</li>`).join('')}</ul>`:'<p>No se registraron respuestas incorrectas.</p>'}<h4>Recursos relacionados</h4>${related.length?related.map(c=>`<p>• ${escapeHTML(c.title)}</p>`).join(''):'<p>Revisa el catálogo para elegir un recurso relacionado con la materia.</p>'}<button class="button button-small" id="prefillAssign">Preparar asignación</button></div>`);
   $('#prefillAssign').addEventListener('click',()=>{closeModal();$('#assignStudent').value=record.student;if(related.length)$('#courseSelect').value=related[0].id;$('#assignForm').scrollIntoView({behavior:'smooth',block:'center'});$('#assignStudent').focus();});
  }
  $('#courseSelect').innerHTML=courses.map(c=>`<option value="${escapeHTML(c.id)}">${escapeHTML(c.title)} — ${escapeHTML(c.subject)}</option>`).join('');
  $('#courseCatalog').innerHTML=courses.map(c=>`<article class="catalog-item"><b>${escapeHTML(c.title)}</b><span>${escapeHTML(c.subject)} · ${escapeHTML(c.topic)}</span><p>${escapeHTML(c.description)}</p></article>`).join('');
  $('#assignForm').addEventListener('submit',event=>{
   event.preventDefault();const student=$('#assignStudent').value.trim();const courseId=$('#courseSelect').value;if(!student||!courseId)return;
   const list=getAssignments();list.push({id:Date.now(),student,courseId,message:$('#assignMessage').value.trim(),date:new Date().toISOString()});write('nl_assignments',list);event.target.reset();
   openModal('Curso asignado',`<p>El curso se asignó correctamente a <strong>${escapeHTML(student)}</strong>.</p><p>El estudiante lo verá en su apartado de cursos asignados al ingresar con el mismo nombre.</p><div class="modal-actions"><button class="button" id="closeAssignNotice">Aceptar</button></div>`);
   $('#closeAssignNotice').addEventListener('click',closeModal);
  });
  $('#exportResults').addEventListener('click',()=>{
   const rows=getResults();const csv=[['Estudiante','Materia','Nivel','Resultado','Correctas','Total','Aprobado','Fecha'],...rows.map(r=>[r.student,r.subject,r.level,r.score,r.correct,r.total,r.passed?'Sí':'No',new Date(r.date).toLocaleString('es-MX')])].map(row=>row.map(value=>'"'+String(value??'').replace(/"/g,'""')+'"').join(',')).join('\n');
   const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='reporte-neurolearn.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  renderTeacher();renderTable();
 }
})();
