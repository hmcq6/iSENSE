<div style="margin-top:7px;" id="visimagewrapper">
    {if !empty($images)}
        {foreach from=$images item=img}
            {if $img.provider_url == $imgurl}
                <img class="selectvisimage" style="height:120px;width:165px;padding:1px 1px 1px 1px;border:4px solid #2396e6;background:#fff;" src="{$img.provider_url}"/>
            {/if}
        {/foreach}
        {foreach from=$images item=img}
            {if $img.provider_url != $imgurl}
                <img class="selectvisimage" style="height:120px;width:165px;margin:5px;" src="{$img.provider_url}"/>
            {/if}
        {/foreach}
    {else}
        There are no images associated with this visualization.
    {/if}
</div>
<input type="hidden" id="storedvisid" value="{$visid}"/>
