import { createStore } from 'redux';
import todoApp from './js/reducer';
import TaskInput from './js/TaskInput';
import TodoList from './js/TodoList';
import Filter from './js/Filter';
import '../static/css/style';

window.BASE_URL = 'https://richegg.top/';
var App = ( _ => {
	var store = createStore(todoApp);
	var unsubscribe = store.subscribe(render);

	function init() {
		getTODOS()
			.then((tasks) => {
				store.dispatch({
					type: 'GET_ALL_TASKS', 
					data: {
						tasks
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function getTODOS() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${BASE_URL}lists`, 
				type: 'post', 
				dataType: 'json', 
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					listName: 'moli'
				}), 
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true, 
				success: function(data, successCode, jqXHR) {
					if(jqXHR.status == 201) {
						resolve(data.tasks);
					} else {
						resolve([]);
					}
				}, 
				error: function(jqXHR) {
					console.dir(jqXHR);
				}
			});
		});
	}

	function render() {
		var state = store.getState();
		var doneNum = 0; 
		var yetNum = 0;
		// set filter button
		$('.filterWrap')
			.find('.filter')
				.removeClass('active')
				.end()
			.find(`.filter.btn-${state.visibility}`)
			.addClass('active');

		// update list 
		$('#listWrap ul').html('');
		state.tasks.forEach((val, i) => {
			if(val.isDone) {
				doneNum ++;
			} else {
				yetNum ++;
			}
			if(state.visibility == 'All' ||
				(state.visibility == 'Done') && val.isDone ||
				(state.visibility == 'Yet') && !val.isDone ) {
				$('#listWrap ul').append(
					`<li data-taskID=${val.id} class="list-group-item task">
						<span class="taskStatus ${!val.isDone ? 'yet' : ''}"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span>
						${$('<textarea>').html(val.text).text()}
						<span class="glyphicon glyphicon-remove btn-delTask pull-right" aria-hidden="true"></span>
					</li>`
				);
			}
		});

		// update count 
		$('#statusWrap').find('.doneNum').text(doneNum);
		$('#statusWrap').find('.yetNum').text(yetNum);
	}

	return {
		init, 
		render, 
		unsubscribe, 
		store, 
		getTODOS
	}
})();

App.init();
TaskInput.init(App.store);
TodoList.init(App.store);
Filter.init(App.store);
