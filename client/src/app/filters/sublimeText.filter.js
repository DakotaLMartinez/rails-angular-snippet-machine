(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .filter('sublimeText', sublimeText);

  function sublimeText(Language) {
    return sublimeTextFilter;

    ////////////////

    function sublimeTextFilter(snippet) {
      var snipObj = snippet || {};
      var result = "<snippet>\n";
      result += "  <content><![CDATA[\n";
      result += snipObj.body + "\n";
      result += "]]></content>\n";
      result += "  <tabTrigger>" + snipObj.trigger + "</tabTrigger>\n";
      if(Language.getSublimeAbbreviation(snipObj.language)) {
        result += "  <scope>" + Language.getSublimeAbbreviation(snipObj.language) + "</scope>\n";
      } else {
        result += "  <!-- Optional: Set a scope to limit where the snippet will trigger -->\n";
        result += "  <!-- <scope>source.python</scope> -->\n";
      }
      result += "</snippet>";
      return result;
    }
  }
})();