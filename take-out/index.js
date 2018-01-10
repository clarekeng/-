$(document).ready(function(){
	layui.use('layer', function(){
		var layer = layui.layer;
	});
	
	var num = 2;
	
	$("#add").click(function(event) {
		num++;
		var moneyDivs = $("<input type='text' class = 'money' placeholder='"+num+".请输入点餐金额(数字)'>");
		$(".moneyDiv").append(moneyDivs);
	});
	$("#total").click(function(event) {
		var blooean = true;
		var num= 0;//序列号
		var total = 0;//计数
		var red_packet = Number($("#red_packet").val());//红包
		var delivery = Number($("#delivery").val());//派送费
		
		$(".money").each(function(index, el) {
			if (!isNaN($(this).val()) && $(this).val()!=""){

				var thisValN = Number($(this).val());

				total = total+ thisValN;
				
			}else{
				layer.msg("请输入点餐金额(数字)");
				blooean = false;
				setTimeout(function() {location.reload()}, 500);
				return false;
			}
		})
		var totals = total + delivery - red_packet;//合计
		var percent = (totals/total).toFixed(2);//优惠比例
		if (blooean) {
			$(".frameDivshow").slideUp('slow');

			$(".frameDivhide").slideDown('slow', function() {
				$(".money").each(function(index, el) {
					num++;
					var thisValN = Number($(this).val());
					total = total+ thisValN;
					var lis = "<li class='hide_li'><span class='fl'>第"+num+".位点单¥"+thisValN+"</span><span class='fr'>¥"+(thisValN*percent).toFixed(2)+"</span></li>";
					$("#hide_ul").append(lis);
				})
			});
		}
		$("#condition").text("(红包¥"+red_packet+"派送费¥"+delivery+")");
		$("#totalS").text("¥"+totals);
	})
})
