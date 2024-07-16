var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Cpu Usage',
            data: [],
            backgroundColor: [
                'rgba(76, 146, 219, 0.3)',

            ],
            borderColor: [
                'rgba(76, 146, 219, 1)',

            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}



var updateChart = function () {
    $.ajax({
      url:'/exportable/',
      type:'post',
      data:{
        wants:"cpu_percent",
        csrfmiddlewaretoken:'lpC4zekaqPV0xTrrFgyMyuQiiJhtbU3FmXuWv5fG4iNErwIJ0qO2TcboVUzMNxUj'
      },
      success:function(response){
        var xVal=response.time;
        var yVal=response.val;
        addData(myChart,xVal,yVal);
      },
    });

    if (myChart.data.labels.length >  15 )
    {
      removeData(myChart)
    }

  };

setInterval(function(){updateChart()}, 2000);


var data=null;
	$.ajax({
	  url:'/exportable/',
	  async:false,
	  type:'post',
	  data:{
		wants:"nas_storage_info",
		csrfmiddlewaretoken:'lpC4zekaqPV0xTrrFgyMyuQiiJhtbU3FmXuWv5fG4iNErwIJ0qO2TcboVUzMNxUj'
	  },
	  success:function(response){
		var used=response.used;
		var free=response.free;
		data={datasets:[{
		  data: [used,free],
		  backgroundColor:[
			'rgba(255, 66, 0,1)',
			'rgba(76, 146, 219,1)',
		  ],
	  }],
	  labels:[
	  'Used (GiB)',
	  'Free (GiB)']
		};

	  },

	});
	var ctx = document.getElementById('myPieChart1').getContext('2d');
	var myPieChart = new Chart(ctx, {
		  type: 'doughnut',
		  data: data,

		  options: {
				responsive: true
			  }
	});

	var data=null;
	$.ajax({
	  url:'/exportable/',
	  async:false,
	  type:'post',
	  data:{
		wants:"local_storage_info",
		csrfmiddlewaretoken:'lpC4zekaqPV0xTrrFgyMyuQiiJhtbU3FmXuWv5fG4iNErwIJ0qO2TcboVUzMNxUj'
	  },
	  success:function(response){
		var used=response.used;
		var free=response.free;
		data={datasets:[{
		  data: [used,free],
		  backgroundColor:[
			'rgba(255, 66, 0,1)',
			'rgba(76, 146, 219,1)',
		  ],
	  }],
	  labels:[
	  'Used (MiB)',
	  'Free (MiB)']
		};

	  },

	});
	var ctx = document.getElementById('myPieChart2').getContext('2d');
	var myPieChart = new Chart(ctx, {
		  type: 'doughnut',
		  data: data,

		  options: {
				responsive: true
			  }
	});

    var updateTable = function () {
		$.ajax({
		  url: '/active/',
		  type:'get',
		  success:function(response){
			var no=response.no;
			document.getElementById('active_conns').textContent=no
		  }
		})
	  }
	  setInterval(function(){updateTable()},10000);