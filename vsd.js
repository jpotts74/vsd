jQuery(document).ready(function () {

	
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const trackingId = urlParams.get("id");
	const trackingEmail = atob(decodeURIComponent(trackingId))
	const requestedPanel = urlParams.get("panel"); 



	if (jQuery(".pathway_tabs").length > 0) {
		if (requestedPanel != null && requestedPanel != "") {
		//if (window.location.search != "") {
			//var target = window.location.search.replace("?", "#");
			var target = "#panel" + requestedPanel;

			var targetTab = jQuery(target);

			var tabs = jQuery(targetTab).closest(".pathway_tabs");
			if (tabs.length > 0) {
				jQuery(".tabs-title a").attr("aria-selected", "false");
				jQuery(".tabs-title a").attr("tabindex", "-1");
				jQuery(".tabs-title.is-active").removeClass("is-active");
				jQuery(".tabs-panel.is-active").removeClass("is-active");
				targetTab.addClass("is-active");
				jQuery("a[href=" + target + "]").closest(".tabs-title").addClass("is-active");
				jQuery("a[href=" + target + "]").attr("aria-selected", "true");
				jQuery("a[href=" + target + "]").attr("tab-index", "0");
			}
			//window.scrollTo(0, 0);
		}



		// fix accordion labels
		jQuery(".pathway_tabs .vertical.tabs .tabs-title a").each(function (i) {
			var panel = jQuery(this).attr("aria-controls");
			var label = jQuery(this).html();
			jQuery("#" + panel + " a.accordion-title").html(label);
			jQuery("#" + panel + " a.accordion-title span.sr-only").removeClass("sr-only");

		});


		// fix accordion is-active status on load
		if (window.innerWidth <= 767) {
			jQuery(".pathway_tabs .tab-wrap").css("display", "none");
			jQuery(".pathway_tabs .accordion-item").removeClass("is-active");

			if (requestedPanel != null && requestedPanel != "") {
				//var target = window.location.search.replace("?", "");
				var target = "panel" + requestedPanel;  //window.location.search.replace("?", "");
				console.log(".pathway_tabs .tab-wrap[aria-labelledby=" + target + "-label]");
				jQuery(".pathway_tabs .tab-wrap[aria-labelledby=" + target + "-label]").css("display", "");
				jQuery("#" + target).addClass("is-active");
			}
			else {
				jQuery(".pathway_tabs .tab-wrap[aria-labelledby=panel1-label]").css("display", "");
				jQuery("#panel1").addClass("is-active");
			}

		}


	}


	
	if (jQuery(".affiliation_process_tabs").length > 0) {
		if (requestedPanel != null && requestedPanel != "") {
		//if (window.location.search != "") {
			//var target = window.location.search.replace("?", "#");
			var target = "#panel" + requestedPanel;

			var targetTab = jQuery(target);

			var tabs = jQuery(targetTab).closest(".affiliation_process_tabs");
			if (tabs.length > 0) {
				jQuery(".tabs-title a").attr("aria-selected", "false");
				jQuery(".tabs-title a").attr("tabindex", "-1");
				jQuery(".tabs-title.is-active").removeClass("is-active");
				jQuery(".tabs-panel.is-active").removeClass("is-active");
				targetTab.addClass("is-active");
				jQuery("a[href=" + target + "]").closest(".tabs-title").addClass("is-active");
				jQuery("a[href=" + target + "]").attr("aria-selected", "true");
				jQuery("a[href=" + target + "]").attr("tab-index", "0");
			}
			//window.scrollTo(0, 0);
		}





		// fix accordion is-active status on load
		if (window.innerWidth <= 767) {
			jQuery(".affiliation_process_tabs .accordion-content").css("display", "none");
			jQuery(".affiliation_process_tabs .accordion-item").removeClass("is-active");

			if (requestedPanel != null && requestedPanel != "") {

			//if (window.location.search != "") {
				//var target = window.location.search.replace("?", "");
				var target = "panel" + requestedPanel;
				jQuery(".affiliation_process_tabs .accordion-content[aria-labelledby=" + target + "-label]").css("display", "");
				jQuery("#" + target + "-label").parent().addClass("is-active");
			}
			else {
				jQuery(".affiliation_process_tabs .accordion-content[aria-labelledby=panel1-label]").css("display", "");
				jQuery("#panel1-label").parent().addClass("is-active");
			}

		}





	}

	if (jQuery("#frm_lead").length == 1) {
		jQuery("#Email").change(function () {
			var email = encodeURIComponent(btoa(jQuery(this).val()));
			var returnURL = "https://www.vitalskinderm.com/pathway/thank-you/?id=" + email;
//			hashedEmail = encodeURIComponent(btoa(email))
//			unhashedEmail = atob(decodeURIComponent(hashedEmail))

			jQuery("#returnURL").attr("value", returnURL);
		});
	}



	if (trackingId != null && trackingId != "") {
		jQuery("main a[href*='/pathway/']").each(function(i) {
			var href = jQuery(this).attr("href");
			if (href.indexOf("?") < 0) {
				href = href + "?id=" + trackingId;
			}
			else if (href.indexOf("&id=") < 0) {
				href = href + "&id=" + trackingId;
			}
			jQuery(this).attr("href", href);
		});


//		jQuery("#tracktestlink").click(function(e) {
//		jQuery("main a[href*='/pathway/']").click(function(e) {
		jQuery("main a").click(function(e) {
			//e.preventDefault();
			
			trackPath = jQuery(this).attr("href").replace("?id=" + trackingId, "").replace("&id=" + trackingId, "").replace("?", "/").replace("=", "");
			if (trackPath.substring(0, 1) == "#") {
				trackPath = window.location.pathname + trackPath.replace("#", "");
			}
			//trackSearch = window.location.search.replace("id=" + trackingId, "").replace("&", "").replace("?", "").replace("=", "");
			console.log(trackPath);
			jQuery.post("https://crm.zoho.com/crm/WebForm", {
				xnQsjsdp: "ef9cdec8c3de5b6107efcc7536514381508d704c4a6d0834376f8f3501d92588",
				zc_gad: "zc_gad",
				xmIwtLD: "e70775e0c551cc9d7e303b0beb39d48382449cc168a7b0a623ec4203b3dc9c86",
				actionType: "Q3VzdG9tTW9kdWxlNw==",
				returnURL: "https://www.vitalskinderm.com/pathway/",
				"NAME": trackingEmail,
				"Email": trackingEmail,
				"COBJ7CF1": trackPath,
				eo: "14f4ec16431e0686150daa43f3210513",
				te: "true"
			});

		});
	}


	/*
	
		jQuery("#tracktestlink").click(function(e) {
			e.preventDefault();

			trackPath = window.location.pathname;
			trackSearch = window.location.search.replace("id=" + trackingId, "").replace("&", "").replace("?", "").replace("=", "");
			console.log(trackPath + trackSearch);
			jQuery.post("https://crm.zoho.com/crm/WebToLeadForm", {
				xnQsjsdp: "ef9cdec8c3de5b6107efcc7536514381508d704c4a6d0834376f8f3501d92588",
				zc_gad: "zc_gad",
				xmIwtLD: "e70775e0c551cc9d7e303b0beb39d483ec035142a3d527cc4b2cb85d568f503b",
				actionType: "TGVhZHM=",
				returnURL: "https://www.vitalskinderm.com/pathway/",
				"Last Name": "jpotts74@gmail.com",
				"Email": trackingEmail,
				"Website": trackPath + trackSearch,
				eo: "14f4ec16431e0686150daa43f3210513",
				te: "true"
			});

		});
	*/



	//jQuery("main a[href*='/pathway/']").click(function(e) {
	/*
		jQuery("#tracktestlink").click(function(e) {
		jQuery.post("https://crm.zoho.com/crm/WebToLeadForm", {
			xnQsjsdp: "ef9cdec8c3de5b6107efcc7536514381508d704c4a6d0834376f8f3501d92588",
			zc_gad: "zc_gad",
			xmIwtLD: "e70775e0c551cc9d7e303b0beb39d483ec035142a3d527cc4b2cb85d568f503b",
			actionType: "TGVhZHM=",
			returnURL: "https://www.vitalskinderm.com/pathway/",
			"Last Name": "jpotts74@gmail.com",
			eo: "14f4ec16431e0686150daa43f3210513",
			te: "true"
		});
		e.preventDefault();
		console.log("here");
	});

*/

});
