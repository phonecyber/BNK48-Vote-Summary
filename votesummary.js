function voteSummary(menu) {
	if(menu != currMenu) {
		if(menu == 1) {
			$('.container.history h1')[0].innerHTML = 'ประวัติการโหวต <small style="">(<span class="amount">' + historyRecord.length + '</span> ครั้ง)</small>';
	    } else if(menu == 2) {
			$('.container.history h1')[0].innerHTML = 'สรุปผลโหวต <small style="">(<span class="amount">' + historyRecord.length + '</span> ครั้ง)</small>';
		}
		currMenu = menu;
		$('table').toggle();
	}
}

function showModal(memberId) {
	$('.avatar').html('<img alt="' + memberJson[memberId].displayName + '" src="../images/profile/profile-' + memberJson[memberId].codeName + '.jpg">');
	$('.displayName').html(memberJson[memberId].displayNameEn);
	$('.subtitle').html(memberJson[memberId].subtitle);
	$('.btn-vt-again')[0].href = '../vote/?id='+memberId;
    $('#codeSuccess').text(memberVote[memberId]);
    $('#msgModal').modal();
}

var memberJson = [];
var memberVote = [];
var memberImg = [];
var currMenu = 1;
$.getJSON("../member.json", function(data) {
	for(var i in data) {
		memberJson[data[i].id] = data[i];
	}
	for(var i in historyRecord) {
		memberId = historyRecord[i]['memberId'];
		if(memberId in memberVote) {
	        memberVote[memberId]++;
	    } else {
	        memberVote[memberId] = 1;
			var tmpImg = '<img class="member-image" src="../images/profile/profile-' + memberJson[memberId].codeName + '.jpg" onclick="showModal(' + memberId +');" style="cursor: pointer;">';
			tmpImg += '<span class="member-name" onclick="showModal(' + memberId +');" style="cursor: pointer;">' + memberJson[memberId].displayNameEn + '</span>';
			memberImg[memberId] = tmpImg;
	    }
	}

	var memberVoteSort = [];
	for (var i in memberVote) {
	    memberVoteSort.push([i, memberVote[i]]);
	}
	memberVoteSort.sort(function(a, b) {
	    return b[1] - a[1];
	});

	var html =  '<table id="modTable" class="table" style="display: none;">';
	html +=         '<thead>';
	html +=             '<tr>';
	html +=                 '<td>ลำดับ</td>';
	html +=                 '<td width="380px">จำนวนโหวต</td>';
	html +=                 '<td width="338px">เมมเบอร์</td>';
	html +=             '</tr>';
	html +=         '</thead>';
	html +=         '<tbody>';
	                    for(var i=0; i<memberVoteSort.length; i++) {
	html +=             '<tr>';
	html +=                 '<td>' + (i+1) + '</td>';
	html +=                 '<td>' + memberVoteSort[i][1] + '</td>';
	html +=                 '<td>' + memberImg[memberVoteSort[i][0]] + '</td>';
	html +=             '</tr>';
	                    }
	html +=         '</tbody>';
	html +=     '</table>';

	$('.table').after(html);

	$('.dropdown-item')[0].outerHTML = '<a class="dropdown-item" href="#" onclick="voteSummary(1);" style="color:#fff;">ประวัติการโหวต</a>';
	$('.dropdown-item')[0].insertAdjacentHTML('afterend', '<a class="dropdown-item" href="#" onclick="voteSummary(2);" style="color:#fff;">สรุปผลโหวต</a>');

	var html = '<div class="modal fade modal-login" id="msgModal" tabindex="-1" role="dialog" aria-labelledby="msgModal" style="padding-right: 17px;">';
	html +=     	'<div class="modal-dialog modal-dialog-centered" role="document">';
	html +=     		'<div class="modal-content modal-senbutsu">';
	html +=     			'<div class="card p-3 text-center" style="background-color:transparent;">';
	html +=     				'<div class="row">';
	html +=     					'<div class="col-md-5">';
	html +=     						'<div class="avatar mt-3">';
	html +=     						'<img alt="จีจี้" src="../images/profile/profile-gygee.jpg"></div>';
	html +=     					'</div>';
	html +=     					'<div class="col-md-7 text-md-left text-sm-center pt-3 pl-sm-0 pr-sm-0 pl-lg-5 pt-lg-5">';
	html +=     						'<span>คุณได้ทำการลงคะแนนให้</span>';
	html +=     						'<h2 class="pt-2 pb-1 pt-md-4 pb-md-3 displayName">GYGEE</h2>';
	html +=     						'<span class="subtitle">ณัฐกุล พิมพ์ธงชัยกุล</span>';
	html +=     					'</div>';
	html +=     				'</div>';
	html +=     				'<hr>';
	html +=     				'<div class="row">';
	html +=     					'<div class="col-lg-6 mx-auto">จำนวน <strong id="codeSuccess" class="pl-3 pr-3" style="font-size:3rem;">0</strong> โหวต </div>';
	html +=     				'</div>';
	html +=     				'<hr>';
	html +=     				'<div class="row">';
	html +=     					'<div class="col-12 mx-auto">';
	html +=     						'<a href="./?id=45" class="btn btn-vt-submit btn-block btn-vt-again">โหวตให้เมมเบอร์คนเดิม</a>';
	html +=     					'</div>';
	html +=     				'</div>';
	html +=     				'<div class="row mt-3">';
	html +=     					'<div class="col-6 mx-auto">';
	html +=     						'<a href="../" class="btn btn-vt-submit btn-block">กลับหน้าหลัก</a>';
	html +=     					'</div>';
	html +=     					'<div class="col-6 mx-auto">';
	html +=     						'<a href="https://www.facebook.com/sharer/sharer.php?u=https://election.bnk48.com/" target="blank" class="btn btn-vt-submit btn-block">แชร์</a>';
	html +=     					'</div>';
	html +=     				'</div>';
	html +=     			'</div>';
	html +=     		'</div>';
	html +=     	'</div>';
	html +=     '</div>';

	$('.container.history').append(html);
});
