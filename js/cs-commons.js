(function(cs_commons, $, undefined) {
	var m_site_url;
	var m_artifact_name;
	var m_artifact_meta;

	function on_metadata_loaded() {
		// For each element with the class cs-commons-tag, see if there
		// is a field in the artifact's metadata object with the same
		// name as the element id.  If so, replace the element's text
		// with the value of the metadata field.
		$(".cs-commons-tag").each(function(index, elt) {
			console.log("handling cs-commons-tag element");
			var id = elt.id;
			if (id) {
				console.log("handling element with id " + id);
				var meta_value = m_artifact_meta[id];
				if (meta_value) {
					$(elt).text(meta_value);
				}
			}
		});
	}

	cs_commons.init = function(site_url, artifact_name) {
		// If artifact name isn't defined, then do nothing.
		// This is appropriate for pages that aren't part of a cs-commons
		// artifact.
		if (artifact_name === '') {
			return;
		}

		if (!site_url) throw new Error("site_url must be defined");
		m_site_url = site_url;
		m_artifact_name = artifact_name;

		// Load artifact meta-data
		$.ajax({
			type : 'GET',
			url : m_site_url + "/meta/" + m_artifact_name + ".json",
			dataType : 'json',
			success : function(data, textStatus, jqXHR) {
				m_artifact_meta = data;
				on_metadata_loaded();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error loading metadata for artifact " + m_artifact_name + ":" + textStatus);
			}
		});
	}
}(window.cs_commons = window.cs_commons || {}, jQuery));

// vim:ts=2:
