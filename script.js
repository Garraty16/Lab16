function calculate_click(){
	var a=[], mins=[], maxs=[];
		if (!grab_data(a, "field-elements-id"))
			return false;
		quick_sort(a);
		alert_mass(a, "Результаты сортировки:");
		a = exclude_repeats(a);
		if (!grab_mins(a, mins, 3))
			return false;
		if (!grab_maxs(a, maxs, 4))
			return false;
		alert_results("3-й минимум: ", mins, "4-й максимум: ", maxs);
}

/**
 * Берет строки из textarea#id
 * и заносит их в массив a в формате int
 *
 * @param a Array
 * @param id string
 */
function grab_data(a, id){
	var text = document.getElementById(id).value.split('\n');
	for (var i in text){
			var s = text[i];
			if (isNaN(s) || s === ""){
				alert("Строка '" + s + "'" + " не является числом. Введите число.");
				return false;
			}
			else{
				a[i] = +s;
			}
	}
	return true;
}

/**
 * Алгоритм быстрой сортировки
 *
 * @param data Array
 * @param compare function(a,b) - возвращает 0, если a=b, -1 => a<b, 1 => a>b (необязательно)
 * @param exchange function(a, i, j) - меняет местами i-й и j-й элемент массивы (необязательно)
 *
 */
function quick_sort(data, compare, exchange){
	var a = data,
			f_compare = compare,
			f_exchange = exchange;

	if (!a instanceof Array){
		return undefined;
	}

	if (f_compare == undefined) { // используем простую функцию сравнения
		f_compare = function(a, b){
			if (a == b)
				return 0;
			else if (a > b)
				return 1;
			else
				return -1;
		}
	}

	if (f_exchange == undefined) { // используем простую функцию обмена
		f_exchange = function(arr, i, j){
			var c = arr[i];
			arr[i] = arr[j];
			arr[j] = c;
		}
	}

	var qs = function(l, r){
		var i = l,
				j = r,
				x = a[l + r>>1];
		while(i <= j) {
			while (f_compare(a[i], x) == -1)
				i++;
			while (f_compare(a[j], x) == 1)
				j--;
			if (i <= j)
				f_exchange(a, i++, j--);
			if (l < j)
				qs(l, j);
			if (i < r)
				qs(i, r);
		}
	}

	qs(0, a.length - 1);
}

// Выводит сообщение до элементов массива, а потом сам массив
function alert_mass(a, sBeforeMessage){
	var sMessage = sBeforeMessage + "\n";
	for (var i = 0; i < a.length; i++){
		sMessage += a[i] + " ";
	}
	alert(sMessage);
}

/**
 * Исключает повторяющиеся элементы из массива a
 *
 * @param a Array
 */
	function exclude_repeats(a){
		outA = [];
		iCurElement = 0;
		isNotThere = function (a, x){ // проверяет, есть ли элемент в массиве
			answ = true;
			for (var k in a){
				if (a[k] == x){
					answ = false;
					break;
				}
			}
			return answ;
		}
		for(var i = 0; i < a.length; i++){
			if (isNotThere(outA, a[i])){
				outA[iCurElement] = a[i];
				iCurElement++;
			}
		}
		return outA;
	}

/**
 * Берет n минимумов из отсортированного массива a и переносит их в mins.
 * Если количество минимумов > количества элементов массива, 
 * массив заполняется одинаковыми.
 *
 * @param a Array
 * @param mins array
 * @param minsNum int
 *
 */
	function grab_mins(a, mins, minsNum){
		lengthA = a.length;
		if (lengthA < minsNum){
			alert("Не хватает элементов для вычисления " + minsNum + " минимума");
			return false;
		}
		for (var i = 0; i < minsNum; i++){
			mins[i] = a[i];
		}
		return true;
	}

/**
 * Берет n максимов из отсортированного массива a и переносит их в maxs.
 *
 * @param a Array
 * @param maxs array
 * @param maxsNum int
 *
 */
	function grab_maxs(a, maxs, maxsNum){
		lengthA = a.length;
		if (lengthA < maxsNum){
			alert("Не хватает элементов для вычисления " + maxsNum + " максимума");
			return false;
		}
		var j = 0;
		for (var i = lengthA - 1; i >= (lengthA - maxsNum); i--){
			maxs[j] = a[i];
			j++;
		}
		return true;
	}

 /**
 * Выводит последние элементы массивов mins и maxs
 * 
 * @param mins Array
 * @param maxs Array
 */
	function alert_results(sBeforeMin, mins, sBeforeMax, maxs){
		var min = mins[mins.length-1];
		var max = maxs[maxs.length-1];
		var sAlertText = sBeforeMin + min + "\n" + 
										sBeforeMax + max;
		if (min == undefined || max == undefined)
			alert("Введите больше чисел")
		else
			alert(sAlertText);
	}